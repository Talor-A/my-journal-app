import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetEntriesInput extends Pick<Prisma.EntryFindManyArgs, "orderBy" | "skip" | "take"> {
  text: string
}

export default resolver.pipe(
  resolver.authorize(),
  async ({ text, orderBy, skip = 0, take = 100 }: GetEntriesInput, ctx) => {
    const where: Prisma.EntryWhereInput = {
      type: "TEXT",
      content: {
        contains: text,
      },
      logbook: {
        userId: ctx.session.userId,
      },
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
