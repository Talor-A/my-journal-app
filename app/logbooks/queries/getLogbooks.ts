import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetLogbooksInput
  extends Pick<Prisma.LogbookFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where: _where, orderBy, skip = 0, take = 100 }: GetLogbooksInput, ctx) => {
    const whereWithCurrentUser: Prisma.LogbookFindManyArgs["where"] = {
      userId: ctx.session?.userId,
    }

    const where: Prisma.LogbookFindManyArgs["where"] = _where
      ? {
          AND: [whereWithCurrentUser, _where],
        }
      : whereWithCurrentUser
    const {
      items: logbooks,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.logbook.count({ where }),
      query: (paginateArgs) => db.logbook.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      logbooks,
      nextPage,
      hasMore,
      count,
    }
  }
)
