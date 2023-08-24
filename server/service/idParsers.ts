import { z } from 'zod';
import type { EmployeeId, TaskId, UserId } from '../commonTypesWithClient/branded';

const createIdParser = <T extends string>() => z.string() as unknown as z.ZodType<T>;

export const userIdParser = createIdParser<UserId>();

export const taskIdParser = createIdParser<TaskId>();

export const EmployeeIdParser = createIdParser<EmployeeId>();
