<template>
    <div class="w-full h-screen overflow-hidden flex flex-col selection:text-black selection:bg-yellow-100">
        <header v-if="$slots.header" class="flex items-center gap-4 px-4 py-3">
            <slot name="header"></slot>
        </header>
        <main v-if="$slots.main" class="flex-1 flex flex-col px-4 pb-3">
            <slot name="main"></slot>
        </main>
    </div>
</template>
