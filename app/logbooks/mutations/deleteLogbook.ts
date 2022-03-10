import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteLogbook = z.object({
  id: z.number(),
})

export default resolver.pipe(resolver.zod(DeleteLogbook), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const logbook = await db.logbook.deleteMany({ where: { id } })

  return logbook
})
