<template>
    <TooltipProvider>
        <Tooltip>
            <TooltipTrigger as-child>
                <div class="flex items-center gap-x-2 font-medium cursor-pointer hover:opacity-80">
                    <slot name="icon"></slot>
                    <span class="pt-[2px]">{{ name }}</span>
                </div>
            </TooltipTrigger>
            <TooltipContent side="right">
                <p>v{{ version }}</p>
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
</template>

<script setup lang="ts">
    import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

    defineProps({
        name: String,
        version: String
    })
</script>
