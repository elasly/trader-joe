import { create } from "domain";
import { relations, sql } from "drizzle-orm";
import {
  index,
  integer,
  pgTableCreator,
  primaryKey,
  serial,
  text,
  timestamp,
  doublePrecision,
  varchar,
} from "drizzle-orm/pg-core";
import { type AdapterAccount } from "next-auth/adapters";
import {type InferSelectModel } from "drizzle-orm"
import e from "cors";


/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `trader-joe_${name}`);

export const posts = createTable(
  "post",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }),
    createdById: varchar("createdById", { length: 255 })
      .notNull()
      .references(() => users.id),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt"),
  },
  (example) => ({
    createdByIdIdx: index("createdById_idx").on(example.createdById),
    nameIndex: index("name_idx").on(example.name),
  })
);

export const users = createTable("user", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  name: varchar("name", { length: 255 }),
  role: varchar("role", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: timestamp("emailVerified", {
    mode: "date",
  }).default(sql`CURRENT_TIMESTAMP`),
  image: varchar("image", { length: 255 }),
});

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
}));

export const accounts = createTable(
  "account",
  {
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => users.id),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
    userIdIdx: index("account_userId_idx").on(account.userId),
  })
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = createTable(
  "session",
  {
    sessionToken: varchar("sessionToken", { length: 255 })
      .notNull()
      .primaryKey(),
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => users.id),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (session) => ({
    userIdIdx: index("session_userId_idx").on(session.userId),
  })
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = createTable(
  "verificationToken",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  })
);

export const indicator = createTable("indicator", {
	id: serial("id").primaryKey().notNull(),
	name: varchar("name"),
	group: varchar("group"),
	description: varchar("description"),
	inputs: varchar("inputs"),
	outputs: varchar("outputs"),
});

export const assetData = createTable("asset_data", {
	id: serial("id").primaryKey().notNull(),
	timestamp: timestamp("timestamp", { mode: 'string' }),
	assetName: varchar("asset_name"),
	open: doublePrecision("open"),
	high: doublePrecision("high"),
	low: doublePrecision("low"),
	close: doublePrecision("close"),
	volume: doublePrecision("volume"),
	timeframe: varchar("timeframe", { length: 10 }),
	exchange: varchar("exchange", { length: 16 }),
});

export const strategies = createTable("strategies", {
	id: serial("id").primaryKey().notNull(),
	name: varchar("name"),
	description: varchar("description"),
});

export const exitRules = createTable("exit_rules", {
	id: serial("id").primaryKey().notNull(),
	strategyId: integer("strategy_id").references(() => strategies.id),
	ruleType: varchar("rule_type"), // e.g., "buy", "sell"
	indicatorId: integer("indicator_id").references(() => indicator.id),
    ruleAction: varchar("rule_action", { length: 10 }), // e.g., "None", "Buy", "Sell"
	// patternId: integer("pattern_id").references(() => patterns.id),
	operator: varchar("operator", { length: 10 }), // e.g., "greater", "less", "crossAbove", "crossBelow"
    value: doublePrecision("value"), // threshold value for the rule
    sequence: integer("sequence"), // order of rule execution
    logicalOperator: varchar("logical_operator", { length: 3 }), // "AND" or "OR"
    compareTo: varchar("compare_to", { length: 10 }), // e.g., "value", "slope", "price", "indicator"
    compIndicatorId: integer("comp_indicator_id").references(() => indicator.id), // id of the indicator to compare to
    slope:varchar("slope", { length: 10 }), // e.g., "positive", "negative", "neutral"
    priceAction: varchar("price_action", { length: 10 }), // e.g., "Close", "Open"
});


export const entryRules = createTable("entry_rules", {
	id: serial("id").primaryKey().notNull(),
	strategyId: integer("strategy_id").references(() => strategies.id),
	ruleType: varchar("rule_type"), // e.g., "buy", "sell"
	indicatorId: integer("indicator_id").references(() => indicator.id),
    ruleAction: varchar("rule_action", { length: 10 }), // e.g., "None", "Buy", "Sell"
	// patternId: integer("pattern_id").references(() => patterns.id),
	operator: varchar("operator", { length: 10 }), // e.g., "greater", "less", "crossAbove", "crossBelow"
    value: doublePrecision("value"), // threshold value for the rule
    sequence: integer("sequence"), // order of rule execution
    logicalOperator: varchar("logical_operator", { length: 3 }), // "AND" or "OR"
    compareTo: varchar("compare_to", { length: 10 }), // e.g., "value", "slope", "price", "indicator"
    compIndicatorId: integer("comp_indicator_id").references(() => indicator.id), // id of the indicator to compare to
    slope:varchar("slope", { length: 10 }), // e.g., "positive", "negative", "neutral"
    priceAction: varchar("price_action", { length: 10 }), // e.g., "Close", "Open"
});

export const riskManagement = createTable("risk_management", {
	id: serial("id").primaryKey().notNull(),
	strategyId: integer("strategy_id").references(() => strategies.id),
	maxDrawdown: doublePrecision("max_drawdown"),
	stopLossType: varchar("stop_loss_type"),
	stopLossValue: doublePrecision("stop_loss_value"),
	stopLossRuleId: integer("stop_loss_rule_id"),
});


export type Strategy = InferSelectModel<typeof strategies>;
export type ExitRule = InferSelectModel<typeof exitRules>;
export type EntryRule = InferSelectModel<typeof entryRules>;
export type RiskManagement = InferSelectModel<typeof riskManagement>;
export type Indicator = InferSelectModel<typeof indicator>;
export type AssetData = InferSelectModel<typeof assetData>;
export type Account = InferSelectModel<typeof accounts>;
export type Session = InferSelectModel<typeof sessions>;
export type VerificationToken = InferSelectModel<typeof verificationTokens>;  
export type User = InferSelectModel<typeof users>;



import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { env } from "../../env";
import { rule } from "postcss";

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
  conn: postgres.Sql | undefined;
};

const conn = globalForDb.conn ?? postgres(env.DATABASE_URL);
if (env.NODE_ENV !== "production") globalForDb.conn = conn;

export const db = drizzle(conn, { schema });

x



const singleEntryRule: EntryRule = {
    ruleType: 'entryRule',
    ruleAction: 'None',
    indicatorId: 0,
    operator: '',
    value: 0,
    sequence: 0,
    logicalOperator: '',
    compareTo: '',
    compIndicatorId: 0,
    slope: '',
    priceAction: ''
  };
  
  try {
    await db.insert(entryRules).values(singleEntryRule);
    console.log("Single entryRule inserted successfully");
  } catch (error) {     
    console.log("Error inserting single entryRule:", error);
  }

const singleExitRule: ExitRule = {
    ruleType: 'exitRule',
    ruleAction: 'None',
    indicatorId: 0,
    operator: '',
    value: 0,
    sequence: 0,
    logicalOperator: '',
    compareTo: '',
    compIndicatorId: 0,
    slope: '',
    priceAction: ''
  };
  
  try {
    await db.insert(exitRules).values(singleExitRule);
    console.log("Single exitRule inserted successfully");
  } catch (error) {
    console.log("Error inserting single exitRule:", error);
  }