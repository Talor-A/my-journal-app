import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetLogbook = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(
  resolver.zod(GetLogbook),
  resolver.authorize(),
  async ({ id }, ctx) => {
    const logbook = await db.logbook.findFirst({ where: { id, userId: ctx.session.userId } })

    if (!logbook) throw new NotFoundError()

    return logbook
  }
)
