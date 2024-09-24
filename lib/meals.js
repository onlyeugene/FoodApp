import fs from "node:fs";

import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";

const db = sql("meals.db");

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // throw new Error ('Loading meals failed');
  return db.prepare("SELECT * FROM meals").all();
}

export function getMeal(slug) {
  return db.prepare("SELECT * FROM meals WHERE slug =  ? ").get(slug);
}

export async function saveMeal(meal) {
  // Generate a slug from the title
  let baseSlug = slugify(meal.title, { lower: true });
  let uniqueSlug = baseSlug;
  let count = 1;

  // Ensure the slug is unique by appending a number if it already exists
  while (db.prepare("SELECT slug FROM meals WHERE slug = ?").get(uniqueSlug)) {
    uniqueSlug = `${baseSlug}-${count}`;
    count++;
  }

  meal.slug = uniqueSlug;
  meal.instructions = xss(meal.instructions);

  // Handle image file and save it to the filesystem
  const extension = meal.image.name.split(".").pop();
  const fileName = `${meal.slug}.${extension}`;

  const stream = fs.createWriteStream(`public/images/${fileName}`);
  const bufferedImage = await meal.image.arrayBuffer();

  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error("Saving image failed");
    }
  });

  meal.image = `/images/${fileName}`;

  // Insert the meal into the database
  db.prepare(`
    INSERT INTO meals 
      (title, summary, instructions, creator, creator_email, image, slug)
      VALUES (
        @title,
        @summary,
        @instructions,
        @creator,
        @creator_email,
        @image,
        @slug
      )
  `).run(meal);
}
