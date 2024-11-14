<template>
    <div :class="['text-sm hover:bg-slate-100 cursor-pointer py-2 px-3', isCopied ? 'opacity-50' : '']" @click="copyUrl(item?.url)">
        <div class="flex items-center gap-3">
            <span :class="[isCopied ? 'line-through' : '']">{{ item?.url }}</span>
            <span class="inline-block bg-slate-100 rounded px-2 py-1 text-xs font-medium">{{ item?.identifier }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { useClipboard } from '@vueuse/core';
    import { ref } from 'vue';

    defineProps({
        item: Object
    })

    const { copy } = useClipboard()
    const isCopied = ref<boolean>(false)

    const copyUrl = (text: string) => {
        copy(text)
        isCopied.value = true
    }
</script>
