import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetEntriesInput extends Pick<Prisma.EntryFindManyArgs, "orderBy" | "skip" | "take"> {
  id: number
}

export default resolver.pipe(
  resolver.authorize(),
  async ({ orderBy, skip = 0, take = 100, id }: GetEntriesInput, ctx) => {
    const where: Prisma.EntryWhereInput = {
      logbook: {
        userId: ctx.session.userId,
        id,
      },
      deletedAt: null,
    }

    const {
      items: entries,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.entry.count({ where }),
      query: (paginateArgs) => db.entry.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      entries,
      nextPage,
      hasMore,
      count,
    }
  }
)
