import { NotFoundError, resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateEntry = z.object({
  content: z.string(),
  logbookId: z.number(),
})

export default resolver.pipe(
  resolver.zod(CreateEntry),
  resolver.authorize(),
  async ({ content, logbookId }, ctx) => {
    const logbook = await db.logbook.findFirst({
      where: { id: logbookId, userId: ctx.session.userId },
    })

    if (!logbook) throw new NotFoundError()

    const entry = await db.entry.create({
      data: {
        content,
        type: "TEXT",
        logbookId,
      },
    })

    return entry
  }
)
