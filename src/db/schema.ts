import {
  boolean,
  index,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const difficultyEnum = pgEnum("difficulty", ["easy", "medium", "hard"]);
export const typeEnum = pgEnum("type", ["qcm", "program", "personality"]);

// Auth tables
export const users = pgTable("user", {
  id: uuid("id").notNull().primaryKey(),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  password: text("password"),
  admin: boolean("admin").default(false).notNull(),
});

export const accounts = pgTable(
  "account",
  {
    userId: uuid("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<"oauth" | "oidc" | "email">().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({ columns: [account.provider, account.providerAccountId] }),
  }),
);

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
);

// Questions table
export const questions = pgTable("questions", {
  id: serial("id").primaryKey().notNull(),
  statement: text("statement").notNull(),
  difficulty: difficultyEnum("difficulty").notNull(),
  type: typeEnum("type").notNull(),
});

// Games table
export const games = pgTable(
  "games",
  {
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    userId: uuid("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    progress: integer("progress").default(0).notNull(), // -1 if done else X where X is the question number
  },
  (table) => {
    return {
      userIdx: index("user_idx").on(table.userId),
    };
  },
);

// Answers table
export const answers = pgTable(
  "answers",
  {
    id: serial("id").primaryKey().notNull(),
    answer: text("answer").notNull(),
    grade: integer("grade"),
    questionId: integer("question_id")
      .references(() => questions.id)
      .notNull(),
    gameId: uuid("game_id")
      .references(() => games.id)
      .notNull(),
  },
  (table) => {
    return {
      gameId: index("game_idx").on(table.gameId),
    };
  },
);
