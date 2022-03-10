import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateLogbook = z.object({
  name: z.string(),
})

export default resolver.pipe(
  resolver.zod(CreateLogbook),
  resolver.authorize(),
  async ({ name }, ctx) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const logbook = await db.logbook.create({ data: { name, userId: ctx.session.userId } })

    return logbook
  }
)
