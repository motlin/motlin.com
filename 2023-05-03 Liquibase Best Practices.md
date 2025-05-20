# Liquibase Best Practices

## One change per changeset

Liquibase's own [best practices](https://www.liquibase.org/get-started/best-practices) documentation only partially covers this point.

> We strongly encourage having only one change per changeset. This makes each change atomic within a single transaction. Each changeset either succeeds or fails. If it fails, it can be corrected and redeployed until it succeeds. Multiple independent changes in one changeset create a risk that some changes deploy while a later change fails. This leaves the database in a partially deployed state which requires manual intervention to correct.

Let's see what happens if we ignore this advice.

```xml
<?xml version="1.1" encoding="UTF-8" standalone="no"?>

<databaseChangeLog xmlns="http://www.liquibase.org/xml/ns/dbchangelog"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.liquibase.org/xml/ns/dbchangelog http://www.liquibase.org/xml/ns/dbchangelog/dbchangelog-3.10.xsd">

    <changeSet author="Demo author" id="demo-changeset-1">
        <createTable tableName="DEMO_TABLE">
            <column name="TEXT_A" type="VARCHAR(255)">
                <constraints nullable="false" />
            </column>
        </createTable>
    </changeSet>

    <changeSet author="Demo author" id="demo-changeset-2">
        <addColumn tableName="DEMO_TABLE">
            <column name="TEXT_B" type="VARCHAR(255)">
                <constraints nullable="false" />
            </column>
        </addColumn>

        <renameColumn tableName="DEMO_TABLE" oldColumnName="TEXT_C" newColumnName="TEXT_D" />
    </changeSet>

</databaseChangeLog>
```

In changeset "demo-changeset-1" we create a table with a single column. In changeset "demo-changeset-2" we add a column and rename another column. But the second changeset refers to a non-existent column "TEXT_C".

When we run the migration, it fails with the following error:

```
liquibase.exception.MigrationFailedException: Migration failed for change set migrations.xml::demo-changeset-2::Demo author:
     Reason: liquibase.exception.DatabaseException: Column "TEXT_C" not found; SQL statement:
ALTER TABLE PUBLIC.DEMO_TABLE ALTER COLUMN TEXT_C RENAME TO TEXT_D [42122-200] [Failed SQL: (42122) ALTER TABLE PUBLIC.DEMO_TABLE ALTER COLUMN TEXT_C RENAME TO TEXT_D]
```

The database is now in a partially migrated state. The table now has two columns, but Liquibase's metadata tables say only the first migration has run. It is very difficult to get out of a partially migrated state. Let's look at a few things which don't work, and then a few things which do.

### Fixing the typo in place doesn't work

We can try to fix the column name in the second changeset and run the migration again.

```xml
<changeSet author="Demo author" id="demo-changeset-2">
    <addColumn tableName="DEMO_TABLE">
        <column name="TEXT_B" type="VARCHAR(255)">
            <constraints nullable="false" />
        </column>
    </addColumn>

    <renameColumn tableName="DEMO_TABLE" oldColumnName="TEXT_A" newColumnName="TEXT_D" />
</changeSet>
```

But now we get a different error:

```
liquibase.exception.DatabaseException: Duplicate column name "TEXT_B"; SQL statement:
ALTER TABLE PUBLIC.DEMO_TABLE ADD TEXT_B VARCHAR(255) NOT NULL [42121-200] [Failed SQL: (42121) ALTER TABLE PUBLIC.DEMO_TABLE ADD TEXT_B VARCHAR(255) NOT NULL]
```

Liquibase is trying to run "demo-changeset-2" from the beginning, but column TEXT_B already exists and attempting to add it again.

### Rolling back "demo-changeset-2" doesn't work

Running the rollback command will reverse a single changeset. However, liquibase believes that the most recent applied changeset is "demo-changeset-1", so it will try to roll that back instead. This will succeed but will presumably destroy data that we need to keep. It isn't really an option.

### Creating a temporary changeset will kind of work

```xml
<changeSet author="Demo author" id="demo-changeset-2">
    <dropColumn tableName="DEMO_TABLE" columnName="TEXT_B" />
</changeSet>

<changeSet author="Demo author" id="demo-changeset-3">
    <addColumn tableName="DEMO_TABLE">
        <column name="TEXT_B" type="VARCHAR(255)">
            <constraints nullable="false" />
        </column>
    </addColumn>
</changeSet>

<changeSet author="Demo author" id="demo-changeset-4">
    <renameColumn tableName="DEMO_TABLE" oldColumnName="TEXT_A" newColumnName="TEXT_D" />
</changeSet>
```

We've changed "demo-changeset-2" to drop the column that Liquibase doesn't know about in its metadata.

We've then added changesets 3 and 4 which are corrected versions of the original changeset 2; what we ought to have written in the first place.

We can now run the migration and it will succeed. However, it left us in an awkward state. Changeset 2 drops a column that changeset 1 does not create. If we attempt to run all the migrations from the beginning, as we would do in a new environment or in a unit test, we will get an error:

```
liquibase.exception.DatabaseException: Column "TEXT_B" not found; SQL statement:
ALTER TABLE PUBLIC.DEMO_TABLE DROP COLUMN TEXT_B [42122-200] [Failed SQL: (42122) ALTER TABLE PUBLIC.DEMO_TABLE DROP COLUMN TEXT_B]
```

### Manual intervention will work

Another option is to manually edit the database. In this case, we can drop the column ourselves before proceeding to run the corrected migrations.

## All migrations should have rollbacks

## Putting it all together

A particularly tricky situation comes from combining two changes in a single changeset, and only providing a working rollback for one of them.

```xml
<changeSet author="Demo author" id="demo-changeset-1">
    <createTable tableName="DEMO_TABLE">
        <column name="TEXT_A" type="VARCHAR(255)">
            <constraints nullable="false" />
        </column>
        <column name="TEXT_B" type="VARCHAR(255)">
            <constraints nullable="false" />
        </column>
    </createTable>
</changeSet>

<changeSet author="Demo author" id="demo-changeset-2">
    <renameColumn tableName="DEMO_TABLE" oldColumnName="TEXT_A" newColumnName="TEXT_C" />
    <renameColumn tableName="DEMO_TABLE" oldColumnName="TEXT_B" newColumnName="TEXT_D" />

    <rollback>
        <renameColumn tableName="DEMO_TABLE" oldColumnName="TEXT_C" newColumnName="TEXT_A" />
        <renameColumn tableName="DEMO_TABLE" oldColumnName="TEXT_4" newColumnName="TEXT_B" />
    </rollback>
</changeSet>
```

Here, migration 2 renames columns A and B to C and D. The error is that the rollback refers to column 4 instead of column D. This is a simple typo.
