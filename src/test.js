"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.riskManagement = exports.entryRules = exports.exitRules = exports.strategies = exports.assetData = exports.indicator = exports.verificationTokens = exports.sessionsRelations = exports.sessions = exports.accountsRelations = exports.accounts = exports.usersRelations = exports.users = exports.posts = exports.createTable = void 0;
var drizzle_orm_1 = require("drizzle-orm");
var pg_core_1 = require("drizzle-orm/pg-core");
/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
exports.createTable = (0, pg_core_1.pgTableCreator)(function (name) { return "trader-joe_".concat(name); });
exports.posts = (0, exports.createTable)("post", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    name: (0, pg_core_1.varchar)("name", { length: 256 }),
    createdById: (0, pg_core_1.varchar)("createdById", { length: 255 })
        .notNull()
        .references(function () { return exports.users.id; }),
    createdAt: (0, pg_core_1.timestamp)("created_at")
        .default((0, drizzle_orm_1.sql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["CURRENT_TIMESTAMP"], ["CURRENT_TIMESTAMP"]))))
        .notNull(),
    updatedAt: (0, pg_core_1.timestamp)("updatedAt"),
}, function (example) { return ({
    createdByIdIdx: (0, pg_core_1.index)("createdById_idx").on(example.createdById),
    nameIndex: (0, pg_core_1.index)("name_idx").on(example.name),
}); });
exports.users = (0, exports.createTable)("user", {
    id: (0, pg_core_1.varchar)("id", { length: 255 }).notNull().primaryKey(),
    name: (0, pg_core_1.varchar)("name", { length: 255 }),
    role: (0, pg_core_1.varchar)("role", { length: 255 }),
    email: (0, pg_core_1.varchar)("email", { length: 255 }).notNull(),
    emailVerified: (0, pg_core_1.timestamp)("emailVerified", {
        mode: "date",
    }).default((0, drizzle_orm_1.sql)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["CURRENT_TIMESTAMP"], ["CURRENT_TIMESTAMP"])))),
    image: (0, pg_core_1.varchar)("image", { length: 255 }),
});
exports.usersRelations = (0, drizzle_orm_1.relations)(exports.users, function (_a) {
    var many = _a.many;
    return ({
        accounts: many(exports.accounts),
    });
});
exports.accounts = (0, exports.createTable)("account", {
    userId: (0, pg_core_1.varchar)("userId", { length: 255 })
        .notNull()
        .references(function () { return exports.users.id; }),
    type: (0, pg_core_1.varchar)("type", { length: 255 })
        .$type()
        .notNull(),
    provider: (0, pg_core_1.varchar)("provider", { length: 255 }).notNull(),
    providerAccountId: (0, pg_core_1.varchar)("providerAccountId", { length: 255 }).notNull(),
    refresh_token: (0, pg_core_1.text)("refresh_token"),
    access_token: (0, pg_core_1.text)("access_token"),
    expires_at: (0, pg_core_1.integer)("expires_at"),
    token_type: (0, pg_core_1.varchar)("token_type", { length: 255 }),
    scope: (0, pg_core_1.varchar)("scope", { length: 255 }),
    id_token: (0, pg_core_1.text)("id_token"),
    session_state: (0, pg_core_1.varchar)("session_state", { length: 255 }),
}, function (account) { return ({
    compoundKey: (0, pg_core_1.primaryKey)({
        columns: [account.provider, account.providerAccountId],
    }),
    userIdIdx: (0, pg_core_1.index)("account_userId_idx").on(account.userId),
}); });
exports.accountsRelations = (0, drizzle_orm_1.relations)(exports.accounts, function (_a) {
    var one = _a.one;
    return ({
        user: one(exports.users, { fields: [exports.accounts.userId], references: [exports.users.id] }),
    });
});
exports.sessions = (0, exports.createTable)("session", {
    sessionToken: (0, pg_core_1.varchar)("sessionToken", { length: 255 })
        .notNull()
        .primaryKey(),
    userId: (0, pg_core_1.varchar)("userId", { length: 255 })
        .notNull()
        .references(function () { return exports.users.id; }),
    expires: (0, pg_core_1.timestamp)("expires", { mode: "date" }).notNull(),
}, function (session) { return ({
    userIdIdx: (0, pg_core_1.index)("session_userId_idx").on(session.userId),
}); });
exports.sessionsRelations = (0, drizzle_orm_1.relations)(exports.sessions, function (_a) {
    var one = _a.one;
    return ({
        user: one(exports.users, { fields: [exports.sessions.userId], references: [exports.users.id] }),
    });
});
exports.verificationTokens = (0, exports.createTable)("verificationToken", {
    identifier: (0, pg_core_1.varchar)("identifier", { length: 255 }).notNull(),
    token: (0, pg_core_1.varchar)("token", { length: 255 }).notNull(),
    expires: (0, pg_core_1.timestamp)("expires", { mode: "date" }).notNull(),
}, function (vt) { return ({
    compoundKey: (0, pg_core_1.primaryKey)({ columns: [vt.identifier, vt.token] }),
}); });
exports.indicator = (0, exports.createTable)("indicator", {
    id: (0, pg_core_1.serial)("id").primaryKey().notNull(),
    name: (0, pg_core_1.varchar)("name"),
    group: (0, pg_core_1.varchar)("group"),
    description: (0, pg_core_1.varchar)("description"),
    inputs: (0, pg_core_1.varchar)("inputs"),
    outputs: (0, pg_core_1.varchar)("outputs"),
});
exports.assetData = (0, exports.createTable)("asset_data", {
    id: (0, pg_core_1.serial)("id").primaryKey().notNull(),
    timestamp: (0, pg_core_1.timestamp)("timestamp", { mode: 'string' }),
    assetName: (0, pg_core_1.varchar)("asset_name"),
    open: (0, pg_core_1.doublePrecision)("open"),
    high: (0, pg_core_1.doublePrecision)("high"),
    low: (0, pg_core_1.doublePrecision)("low"),
    close: (0, pg_core_1.doublePrecision)("close"),
    volume: (0, pg_core_1.doublePrecision)("volume"),
    timeframe: (0, pg_core_1.varchar)("timeframe", { length: 10 }),
    exchange: (0, pg_core_1.varchar)("exchange", { length: 16 }),
});
exports.strategies = (0, exports.createTable)("strategies", {
    id: (0, pg_core_1.serial)("id").primaryKey().notNull(),
    name: (0, pg_core_1.varchar)("name"),
    description: (0, pg_core_1.varchar)("description"),
});
exports.exitRules = (0, exports.createTable)("exit_rules", {
    id: (0, pg_core_1.serial)("id").primaryKey().notNull(),
    strategyId: (0, pg_core_1.integer)("strategy_id").references(function () { return exports.strategies.id; }),
    ruleType: (0, pg_core_1.varchar)("rule_type"), // e.g., "buy", "sell"
    indicatorId: (0, pg_core_1.integer)("indicator_id").references(function () { return exports.indicator.id; }),
    ruleAction: (0, pg_core_1.varchar)("rule_action", { length: 10 }), // e.g., "None", "Buy", "Sell"
    // patternId: integer("pattern_id").references(() => patterns.id),
    operator: (0, pg_core_1.varchar)("operator", { length: 10 }), // e.g., "greater", "less", "crossAbove", "crossBelow"
    value: (0, pg_core_1.doublePrecision)("value"), // threshold value for the rule
    sequence: (0, pg_core_1.integer)("sequence"), // order of rule execution
    logicalOperator: (0, pg_core_1.varchar)("logical_operator", { length: 3 }), // "AND" or "OR"
    compareTo: (0, pg_core_1.varchar)("compare_to", { length: 10 }), // e.g., "value", "slope", "price", "indicator"
    compIndicatorId: (0, pg_core_1.integer)("comp_indicator_id").references(function () { return exports.indicator.id; }), // id of the indicator to compare to
    slope: (0, pg_core_1.varchar)("slope", { length: 10 }), // e.g., "positive", "negative", "neutral"
    priceAction: (0, pg_core_1.varchar)("price_action", { length: 10 }), // e.g., "Close", "Open"
});
exports.entryRules = (0, exports.createTable)("entry_rules", {
    id: (0, pg_core_1.serial)("id").primaryKey().notNull(),
    strategyId: (0, pg_core_1.integer)("strategy_id").references(function () { return exports.strategies.id; }),
    ruleType: (0, pg_core_1.varchar)("rule_type"), // e.g., "buy", "sell"
    indicatorId: (0, pg_core_1.integer)("indicator_id").references(function () { return exports.indicator.id; }),
    ruleAction: (0, pg_core_1.varchar)("rule_action", { length: 10 }), // e.g., "None", "Buy", "Sell"
    // patternId: integer("pattern_id").references(() => patterns.id),
    operator: (0, pg_core_1.varchar)("operator", { length: 10 }), // e.g., "greater", "less", "crossAbove", "crossBelow"
    value: (0, pg_core_1.doublePrecision)("value"), // threshold value for the rule
    sequence: (0, pg_core_1.integer)("sequence"), // order of rule execution
    logicalOperator: (0, pg_core_1.varchar)("logical_operator", { length: 3 }), // "AND" or "OR"
    compareTo: (0, pg_core_1.varchar)("compare_to", { length: 10 }), // e.g., "value", "slope", "price", "indicator"
    compIndicatorId: (0, pg_core_1.integer)("comp_indicator_id").references(function () { return exports.indicator.id; }), // id of the indicator to compare to
    slope: (0, pg_core_1.varchar)("slope", { length: 10 }), // e.g., "positive", "negative", "neutral"
    priceAction: (0, pg_core_1.varchar)("price_action", { length: 10 }), // e.g., "Close", "Open"
});
exports.riskManagement = (0, exports.createTable)("risk_management", {
    id: (0, pg_core_1.serial)("id").primaryKey().notNull(),
    strategyId: (0, pg_core_1.integer)("strategy_id").references(function () { return exports.strategies.id; }),
    maxDrawdown: (0, pg_core_1.doublePrecision)("max_drawdown"),
    stopLossType: (0, pg_core_1.varchar)("stop_loss_type"),
    stopLossValue: (0, pg_core_1.doublePrecision)("stop_loss_value"),
    stopLossRuleId: (0, pg_core_1.integer)("stop_loss_rule_id"),
});
var postgres_js_1 = require("drizzle-orm/postgres-js");
var postgres_1 = require("postgres");
var env_1 = require("../../env");
/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
var globalForDb = globalThis;
var conn = (_a = globalForDb.conn) !== null && _a !== void 0 ? _a : (0, postgres_1.default)(env_1.env.DATABASE_URL);
if (env_1.env.NODE_ENV !== "production")
    globalForDb.conn = conn;
exports.db = (0, postgres_js_1.drizzle)(conn, { schema: schema });
x;
var singleEntryRule = {
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
    await exports.db.insert(exports.entryRules).values(singleEntryRule);
    console.log("Single entryRule inserted successfully");
}
catch (error) {
    console.log("Error inserting single entryRule:", error);
}
var singleExitRule = {
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
    await exports.db.insert(exports.exitRules).values(singleExitRule);
    console.log("Single exitRule inserted successfully");
}
catch (error) {
    console.log("Error inserting single exitRule:", error);
}
var templateObject_1, templateObject_2;
