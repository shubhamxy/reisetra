export function stackObj(stacktrace: string): string | string[] | undefined {
    if (stacktrace) {
        const stack = stacktrace.split('\n')
        return stack.length === 1 ? undefined : stack
    }
    return stacktrace
}

export function getErrorMessage(error: any): string {
    // @TODO: find a better way??
    if (String(error.message).startsWith('\nInvalid `prisma.')) {
        return 'Database error'
    }
    return error?.meta?.cause || error.message
}
