<template>
    <ScrollArea class="h-full border rounded-lg shadow">
        <UrlItem v-for="(item, index) in list" :key="index" :item="item" />
    </ScrollArea>
</template>

<script setup lang="ts">
    import { ScrollArea } from '@/components/ui/scroll-area'
    import UrlItem from '@/components/url/UrlItem.vue';

    import type { Url } from '@/types/url';

    defineProps({
        list: Array<Url>
    })
</script>
