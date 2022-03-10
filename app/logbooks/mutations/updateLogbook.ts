import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateLogbook = z.object({
  id: z.number(),
  name: z.string(),
})

export default resolver.pipe(
  resolver.zod(UpdateLogbook),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const logbook = await db.logbook.update({ where: { id }, data })

    return logbook
  }
)
