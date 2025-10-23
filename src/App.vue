<template>
    <div>
        <!-- Header -->
        <header class="flex items-center gap-4 py-4 max-w-7xl mx-auto">
            <div class="flex-1">
                <div class="text-lg font-medium">Url Builder</div>
            </div>
            <Dialog>
                <DialogTrigger as-child>
                    <Button>
                        Add Url's
                    </Button>
                </DialogTrigger>
                <DialogContent class="sm:max-w-6xl">
                    <DialogHeader>
                        <DialogTitle>New Url's</DialogTitle>
                        <DialogDescription>
                            Add your url's details below.
                        </DialogDescription>
                    </DialogHeader>
                    <div class="py-4">
                        <Textarea v-model="urls" placeholder="Url's" class="h-[60vh]"></Textarea>
                    </div>
                    <DialogFooter>
                        <DialogClose as-child>
                            <Button type="submit" @click="buildUrls">
                                Build
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </header>
        <!-- Url List -->
        <div class="bg-white border border-stone-200 rounded-lg max-w-7xl mx-auto min-h-52 overflow-hidden">
            <!-- Header -->
            <div class="grid grid-cols-12 divide-x">
                <!-- Title -->
                <div class="col-span-3 text-sm font-semibold p-2">
                    Title
                </div>
                <!-- Url -->
                <div class="col-span-9 text-sm font-semibold p-2">
                    Url
                </div>
            </div>
            <!-- List -->
            <div v-for="(url, index) in urlList" :key="index" class="grid grid-cols-12 divide-x items-center border-t">
                <!-- Title -->
                <div class="col-span-3 font-medium p-3">
                    {{ url.title }}
                </div>
                <!-- Url -->
                <div class="col-span-9 truncate relative p-3">
                    {{ url.url }}
                    <div class="absolute right-0 inset-y-0 flex items-center justify-center bg-white px-1.5">
                        <Button size="icon" variant="secondary" @click="copyUrl(index)">
                            <CopyCheckIcon v-if="copiedIndex === index" />
                            <CopyIcon v-else />
                        </Button>
                    </div>
                </div>
            </div>
            <!-- Empty State -->
            <div v-if="urlList.length <= 0" class="border-t">

            </div>
        </div>
    </div>
    <Toaster />
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useClipboard } from "@vueuse/core"
import { toast, Toaster } from 'vue-sonner'
import { buildUrlsFromText } from '@/lib/urlBuilder'
import type { BuiltUrlItem } from '@/lib/urlBuilder'

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog"
import { CopyCheckIcon, CopyIcon } from "lucide-vue-next"

const urls = ref<string>("")
const urlList = ref<BuiltUrlItem[]>([])
const copiedIndex = ref<number | null>(null)

const { copy } = useClipboard()

const CMS_URL = ref<string>("{{domain_url}}?coupon={{COUPON_ID}}&utm_source={{UTM_SOURCE}}&utm_medium={{UTM_MEDIUM}}&utm_campaign={{UTM_CAMPAIGN}}&link_id=cms{{link_id}}")

const buildUrls = () => {
    // Use shared builder util
    const built = buildUrlsFromText(urls.value, { template: CMS_URL.value })
    urlList.value = built
    if (built.length === 0 && urls.value.trim().length > 0) {
        toast.error('No valid URLs were parsed. Check input format (linkId;domain)')
    } else {
        toast.success(`${built.length} URL(s) built`)
    }
}

const copyUrl = async (index: number) => {
    const text = urlList.value[index]?.url || ""
    try {
        await copy(text)
        copiedIndex.value = index
        // Clear feedback after 1.5s
        setTimeout(() => {
            if (copiedIndex.value === index) copiedIndex.value = null
        }, 1500)
    } catch (e) {
        // Ignore copy errors for now
        console.error("Copy failed", e)
    }
}
</script>
