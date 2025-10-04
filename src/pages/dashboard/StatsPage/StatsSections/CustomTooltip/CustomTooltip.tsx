import styles from './CustomTooltip.module.css'

import { ColorSwatch, Flex, Group, Text } from "@mantine/core";

interface ChartTooltipProps {
    payload?: TooltipData[] | undefined,
    total: number,
    dollarAmount?: boolean,
    largeBox?: boolean
}

interface TooltipData {
    name: string,
    value: number,
    payload: {
        fill: string;
    }
}

export function CustomTooltip ({ payload, total, dollarAmount, largeBox}: ChartTooltipProps)  {
    if (!payload) return null

    const data = payload[0]

    if (payload && payload.length) {
        return (
            <Flex gap={0} justify="space-between" w={dollarAmount || largeBox ? '250px' : '200px'} className={styles.tooltip} direction={dollarAmount || largeBox ? 'column' : 'row'}>
                <Group gap={5}>
                    <ColorSwatch color={data.payload.fill} size={15} withShadow={false}></ColorSwatch>
                    <Text size='sm' fw={500}>{data.name}</Text>
                </Group>
                <Group gap={5}>
                    <Text size='sm'>{dollarAmount ? '$' : ''}{data.value.toLocaleString('es-AR')} ({((data.value / total) * 100).toFixed(1)}%)</Text>
                </Group>
            </Flex>
        );
    }

    return null;
};