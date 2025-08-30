import { useMediaQuery } from '@mantine/hooks'

import { Button, Group, Pagination } from "@mantine/core";

import type { Pagination as PaginationType } from "../../../entities/pagination.ts";

interface CustomPaginationProps {
    pagination: PaginationType,
    changePagination: (pageValue: number) => void,
}

export function CustomPagination({pagination, changePagination}: CustomPaginationProps) {
    const isMobile = useMediaQuery('(max-width: 500px)')

    if (pagination.totalPages <= 1) return null

    if (isMobile) {
        return (
            <Pagination.Root total={pagination.totalPages} value={pagination.currentPage} onChange={(value: number) => changePagination(value)}>
                <Group gap={5}>
                    <Pagination.First/>
                    <Pagination.Previous/>
                    <Button size='compact-md'>{pagination.currentPage}</Button>
                    <Pagination.Next/>
                    <Pagination.Last/>
                </Group>
            </Pagination.Root>
        )
    } else {
        return (
            <Pagination total={pagination.totalPages} value={pagination.currentPage} onChange={(value: number) => changePagination(value)} withEdges/>
        )
    }
}