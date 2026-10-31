import {beforeAll} from "vite-plus/test";
import {setProjectAnnotations} from "@storybook/react";
import * as projectAnnotations from "./preview";
// oxlint-disable-next-line import/no-unassigned-import -- This import registers the jest-dom matchers.
import "@testing-library/jest-dom/vitest";

const project = setProjectAnnotations([projectAnnotations]);

beforeAll(project.beforeAll);
