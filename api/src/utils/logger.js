import winston from "winston";
import path from "path";

const logFormat = winston.format.printf(({ level, message, timestamp }) => {
  return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
});

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    logFormat
  ),
  transports: [
    new winston.transports.File({
      filename: path.resolve("logs/error.log"),
      level: "error",
    }),
    new winston.transports.File({
      filename: path.resolve("logs/warn.log"),
      level: "warn",
    }),
    new winston.transports.File({
      filename: path.resolve("logs/info.log"),
      level: "info",
    }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    })
  );
}

export default logger;
