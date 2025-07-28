import { DAYS_OF_WEEK_IN_ORDER } from "@/constants";
import { table } from "console";
import { relations } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

const createdAt = timestamp("createdAt").notNull().defaultNow();
const updatedAt = timestamp("updatedAt")
  .notNull()
  .defaultNow()
  .$onUpdate(() => new Date());

export const EventTable = pgTable(
  "events", // table name in the database
  {
    id: uuid("id").primaryKey().defaultRandom(),
    // unique ID with default UUID
    // uuid("id"): Defines a column named "id" with the UUID type
    // .primaryKey(): Makes this UUID the primary key of the table
    // .defaultRandom(): Automatically fills this column with a randomly generated UUID (v4) if no value is provided

    name: text("name").notNull(),
    description: text("description"),
    durationInMinutes: integer("durationInMinutes").notNull(),
    clerkUserId: text("clerkUserId").notNull(),
    isActive: boolean("isActive").notNull().default(true),
    createdAt,
    updatedAt,
  },
  (table) => [
    index("clerkUserIdIndex").on(table.clerkUserId), // index on clerkUserId for faster querying
  ]
);

// "schedules" table, one per user, with timezone and timestamps
export const ScheduleTable = pgTable("schedules", {
  id: uuid("id").primaryKey().defaultRandom(),
  timezone: text("timezone").notNull(),
  clerkUserId: text("clerkUserId").notNull(),
  createdAt,
  updatedAt,
});

// Define relationships fot the SheduleTable: a schedule has many availabilities
export const scheduleRelations = relations(ScheduleTable, ({ many }) => ({
  availabilities: many(ScheduleAvailabilityTable), // one-to-many-relationship
}));

// PostgreSQL ENUM for the days of the week
export const scheduleDayOfWeekEnum = pgEnum("day", DAYS_OF_WEEK_IN_ORDER);

// "scheduleAvailabilities" table, which stores available time slots per day
export const ScheduleAvailabilityTable = pgTable(
  "scheduleAvailabilities",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    scheduleId: uuid("scheduleId") // foreign key to the Schedule table
      .notNull()
      .references(() => ScheduleTable.id, { onDelete: "cascade" }), // cascade delete when the schedule is deleted
    startTime: text("startTime").notNull(),
    endTime: text("endTime").notNull(),
    dayOfWeek: scheduleDayOfWeekEnum("dayOfWeek").notNull(),
  },
  (table) => [
    index("scheduleIdIndex").on(table.scheduleId), // index on foreign key for faster lookups
  ]
);

// define reverse relation: each availability belongs to a schedule
export const ScheduleAvailabilityRelations = relations(
  ScheduleAvailabilityTable,
  ({ one }) => ({
    schedule: one(ScheduleTable, {
      fields: [ScheduleAvailabilityTable.scheduleId], // local key
      references: [ScheduleTable.id], // foreign key
    }),
  })
);
