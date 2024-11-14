<template>
    <div :class="['h-full flex flex-col items-center justify-center', debugMode ? 'border border-blue-400 border-dashed rounded-lg' : '']">
        <div class="bg-white border border-dashed rounded-lg shadow flex flex-col items-center gap-6 p-12">
            <img src="@/assets/img/Folder_Empty.svg" alt="No urls" width="160">
            <div class="text-center space-y-1">
                <div class="text-xl font-medium">No URLs yet!</div>
                <div class="text-muted-foreground">Click the "Add urls" button to start adding urls.</div>
            </div>
            <Button size="lg" @click="$emit('onAddUrls')">
                <ListPlus />
                Add Urls
            </Button>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { Button } from '@/components/ui/button'
    import { ListPlus } from 'lucide-vue-next';

    defineProps({
        debugMode: Boolean
    })
</script>
