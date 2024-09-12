import { z, defineCollection } from 'astro:content'

const blogSchema = z.object({
  title: z.string(),
  description: z.string(),
})

const blogCollection = defineCollection({
  type: 'content',
  schema: blogSchema,
})

export const collections = {
  blog: blogCollection,
}
