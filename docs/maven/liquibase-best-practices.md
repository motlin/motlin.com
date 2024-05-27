---
sidebar_position: 3
title: Liquibase Best Practices
description: Best practices for using Liquibase for database schema management
tags: [java, database, liquibase, maven]
last_update:
  date: 2023-05-03
---

# Liquibase Best Practices

## Overview

[Liquibase](https://www.liquibase.org/) is an open-source database schema change management solution. It allows you to track, version, and deploy database changes.

## Project Structure

Organize your Liquibase files in a clear hierarchy:

```
src/main/resources/db/
├── changelog/
│   ├── db.changelog-master.xml
│   ├── releases/
│   │   ├── 1.0/
│   │   │   ├── db.changelog-1.0.xml
│   │   │   ├── create-user-table.xml
│   │   │   └── create-order-table.xml
│   │   └── 1.1/
│   │       ├── db.changelog-1.1.xml
│   │       └── add-email-to-user.xml
│   └── data/
│       └── initial-data.xml
```

## Master Changelog

Keep your master changelog simple and include release changelogs:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<databaseChangeLog
    xmlns="http://www.liquibase.org/xml/ns/dbchangelog"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.liquibase.org/xml/ns/dbchangelog
        http://www.liquibase.org/xml/ns/dbchangelog/dbchangelog-latest.xsd">

    <include file="releases/1.0/db.changelog-1.0.xml" relativeToChangelogFile="true"/>
    <include file="releases/1.1/db.changelog-1.1.xml" relativeToChangelogFile="true"/>
</databaseChangeLog>
```

## Changeset Best Practices

### Use Meaningful IDs

```xml
<!-- Good -->
<changeSet id="2023-05-03-create-user-table" author="developer">

<!-- Bad -->
<changeSet id="1" author="dev">
```

### One Change per Changeset

```xml
<!-- Good - separate changesets -->
<changeSet id="2023-05-03-create-user-table" author="developer">
    <createTable tableName="user">
        <column name="id" type="bigint">
            <constraints primaryKey="true" nullable="false"/>
        </column>
    </createTable>
</changeSet>

<changeSet id="2023-05-03-create-user-index" author="developer">
    <createIndex tableName="user" indexName="idx_user_email">
        <column name="email"/>
    </createIndex>
</changeSet>

<!-- Bad - multiple changes in one changeset -->
<changeSet id="2023-05-03-user-changes" author="developer">
    <createTable tableName="user">...</createTable>
    <createIndex tableName="user">...</createIndex>
</changeSet>
```

### Always Include Rollback

```xml
<changeSet id="2023-05-03-add-email-column" author="developer">
    <addColumn tableName="user">
        <column name="email" type="varchar(255)"/>
    </addColumn>
    <rollback>
        <dropColumn tableName="user" columnName="email"/>
    </rollback>
</changeSet>
```

## Preconditions

Use preconditions to ensure safe deployments:

```xml
<changeSet id="2023-05-03-add-email-column" author="developer">
    <preConditions onFail="MARK_RAN">
        <tableExists tableName="user"/>
        <not>
            <columnExists tableName="user" columnName="email"/>
        </not>
    </preConditions>
    <addColumn tableName="user">
        <column name="email" type="varchar(255)"/>
    </addColumn>
</changeSet>
```

## Contexts and Labels

Use contexts for environment-specific changes:

```xml
<changeSet id="2023-05-03-test-data" author="developer" context="test">
    <insert tableName="user">
        <column name="id" value="1"/>
        <column name="email" value="test@example.com"/>
    </insert>
</changeSet>
```

Apply contexts during deployment:

```bash
mvn liquibase:update -Dliquibase.contexts=test
```

## Maven Configuration

Configure Liquibase in your `pom.xml`:

```xml
<plugin>
    <groupId>org.liquibase</groupId>
    <artifactId>liquibase-maven-plugin</artifactId>
    <version>4.22.0</version>
    <configuration>
        <propertyFile>src/main/resources/liquibase.properties</propertyFile>
        <changeLogFile>db/changelog/db.changelog-master.xml</changeLogFile>
    </configuration>
    <dependencies>
        <dependency>
            <groupId>org.postgresql</groupId>
            <artifactId>postgresql</artifactId>
            <version>42.6.0</version>
        </dependency>
    </dependencies>
</plugin>
```

## Properties File

Use a properties file for database configuration:

```properties
# liquibase.properties
driver=org.postgresql.Driver
url=jdbc:postgresql://localhost:5432/mydb
username=dbuser
password=${env.DB_PASSWORD}
changeLogFile=db/changelog/db.changelog-master.xml
```

## SQL Changesets

For complex changes, use SQL:

```xml
<changeSet id="2023-05-03-complex-migration" author="developer">
    <sql splitStatements="true" stripComments="true">
        UPDATE user SET status = 'ACTIVE' WHERE last_login > NOW() - INTERVAL '30 days';
        UPDATE user SET status = 'INACTIVE' WHERE last_login <= NOW() - INTERVAL '30 days';
    </sql>
    <rollback>
        <sql>
            UPDATE user SET status = NULL;
        </sql>
    </rollback>
</changeSet>
```

## Testing Changes

### Generate SQL Preview

```bash
mvn liquibase:updateSQL
```

### Rollback Testing

```bash
# Tag current state
mvn liquibase:tag -Dliquibase.tag=before-release

# Apply changes
mvn liquibase:update

# Test rollback
mvn liquibase:rollback -Dliquibase.rollbackTag=before-release
```

## Common Pitfalls to Avoid

### Don't Modify Existing Changesets

Once a changeset has been deployed, never modify it. Create a new changeset instead.

### Avoid Database-Specific SQL

```xml
<!-- Bad - PostgreSQL specific -->
<sql>
    ALTER TABLE user ADD COLUMN data JSONB;
</sql>

<!-- Good - use Liquibase abstractions -->
<addColumn tableName="user">
    <column name="data" type="json"/>
</addColumn>
```

### Handle Schema Dependencies

Order your changesets to respect foreign key dependencies:

```xml
<!-- Create parent table first -->
<changeSet id="2023-05-03-create-department" author="developer">
    <createTable tableName="department">
        <column name="id" type="bigint">
            <constraints primaryKey="true"/>
        </column>
    </createTable>
</changeSet>

<!-- Then create child table with foreign key -->
<changeSet id="2023-05-03-create-employee" author="developer">
    <createTable tableName="employee">
        <column name="department_id" type="bigint">
            <constraints foreignKeyName="fk_employee_department"
                        referencedTableName="department"
                        referencedColumnNames="id"/>
        </column>
    </createTable>
</changeSet>
```

## CI/CD Integration

### Validate Changes in CI

```yaml
# .github/workflows/database.yml
- name: Validate Liquibase
  run: mvn liquibase:validate

- name: Generate Update SQL
  run: mvn liquibase:updateSQL
```

### Automated Deployments

```bash
#!/bin/bash
# deploy.sh

# Backup current state
mvn liquibase:tag -Dliquibase.tag=backup-$(date +%Y%m%d-%H%M%S)

# Apply changes
mvn liquibase:update

# Verify deployment
mvn liquibase:status
```

## Monitoring and Maintenance

### Check Database State

```bash
mvn liquibase:status
mvn liquibase:history
```

### Clear Checksums After Manual Changes

```bash
mvn liquibase:clearCheckSums
```

## Conclusion

Following these Liquibase best practices ensures reliable, traceable, and reversible database schema management. Always test your changes thoroughly before deploying to production.
