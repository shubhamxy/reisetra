import { PageCursorsType, createPageCursors } from './pageCursor';


export interface PaginationType {
  results: any[];
  link: PageCursorsType;
  totalCount: number;
  page: number;
}
interface Props {
  model: string;
  cursor: string;
  size: number;
  buttonNum: number;
  orderBy: string;
  orderDirection: 'asc' | 'desc';
  include?: any;
  where?: any;
  prisma: any;
  select?: any;
}

export async function prismaOffsetPagination({
  model,
  cursor,
  size,
  buttonNum,
  orderBy,
  orderDirection,
  include,
  where,
  select,
  prisma,
}: Props): Promise<PaginationType> {
  // totalCount
  const prismaModel = prisma[model.toLowerCase()];
  const totalCount = await prismaModel.count({
    where: {
      ...where,
    },
  });

  if (!totalCount) {
    return {
      results: null,
      link: {
        first: null,
        previous: null,
        around: null,
        next: null,
        last: null,
      },
      page: 0,
      totalCount: 0,
    };
  }

  // findManyArgs
  let findManyArgs;
  if (where) {
    findManyArgs = { ...findManyArgs, where: { ...where } };
  }
  if (size) {
    findManyArgs = { ...findManyArgs, take: size };
  }
  if (orderBy) {
    findManyArgs = { ...findManyArgs, orderBy: { [orderBy]: orderDirection } };
  }
  if (include) {
    findManyArgs = { ...findManyArgs, include: include };
  }

  if (select) {
    findManyArgs = { ...findManyArgs, select };
  }

  // cursor & currentPage
  let currentPage: number;
  if (cursor) {
    const prismaModel = prisma[model.toLowerCase()];
    const decryptedCursor = Buffer.from(cursor, 'base64').toString('ascii').slice(9);
    let idOrigin: number | string = isNaN(parseInt(decryptedCursor)) ? decryptedCursor : Number(decryptedCursor);

    // findManyArgsForCursorCount -> cursorCount -> currentPage
    let findManyArgsForCursorCount: Record<string, any>;
    if (findManyArgs?.orderBy) {
      const cursorObject = await prismaModel.findMany({
        orderBy: {
          [orderBy]: orderDirection,
        },
        where: {
          ...where,
        },
        cursor: {
          id: idOrigin,
        },
        take: 1,
      });
      const whereArgs = orderDirection === 'desc' ? {
        [orderBy]: {
          gte: cursorObject[0][orderBy],
        },
      } : {
        [orderBy]: {
          lte: cursorObject[0][orderBy],
        },
      };
      findManyArgsForCursorCount = {
        orderBy: {
          [orderBy]: orderDirection,
        },
        where: {
          ...where,
          ...whereArgs,
        },
      };
    } else {
      findManyArgsForCursorCount = {
        where: {
          ...where,
          id: {
            lte: idOrigin,
          },
        },
      };
    }
    const cursorCount = await prismaModel.count({
      ...findManyArgsForCursorCount,
    });
    currentPage = Math.ceil(cursorCount / size);

    // Reset idOrigin when it is not exact pageCursor
    if (cursorCount % size !== 1) {
      const newCursorObject = await prismaModel.findMany({
        orderBy: {
          [orderBy]: orderDirection,
        },
        where: {
          ...where,
        },
        cursor: {
          id: idOrigin,
        },
        skip: cursorCount % size !== 0 ? cursorCount % size - 1 : size - 1,
        take: -1,
      });
      idOrigin = newCursorObject[0].id;
    }

    findManyArgs = { ...findManyArgs, cursor: { id: idOrigin } };
  } else {
    const resultsForCursor = await prismaModel.findMany({
      ...findManyArgs,
      take: 1,
    });
    currentPage = 1;
    findManyArgs = { ...findManyArgs, cursor: { id: resultsForCursor[0].id } };
  }

  const resultsForEdges = await prismaModel.findMany({
    ...findManyArgs,
  });

  const link = await createPageCursors({
    pageInfo: {
      currentPage,
      size,
      buttonNum,
      totalCount,
    },
    model,
    findManyArgs,
    prisma,
  });

  return {
    results: resultsForEdges,
    link,
    page: currentPage,
    totalCount: totalCount,
  };
}
