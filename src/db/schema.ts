import { boolean, index, integer, pgEnum, pgTable, serial, uuid, varchar } from "drizzle-orm/pg-core";

export const difficultyEnum = pgEnum("difficulty", ["easy", "medium", "hard"]);
export const typeEnum = pgEnum("type", ["qcm", "program", "personality"]);

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey().notNull(),
  email: varchar("email").notNull(),
  password: varchar("password").notNull(),
  admin: boolean("admin").default(false).notNull(),
});

// Questions table
export const questions = pgTable("questions", {
  id: serial("id").primaryKey().notNull(),
  statement: varchar("statement").notNull(),
  difficulty: difficultyEnum("difficulty").notNull(),
  type: typeEnum("type").notNull(),
});

// Games table
export const games = pgTable(
  "games",
  {
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    userId: integer("user_id")
      .references(() => users.id)
      .notNull(),
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
    answer: varchar("answer").notNull(),
    grade: integer("grade"), // Between 0 and 100 & null if personality question
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
