<template>
    <div>
        <!-- Header -->
        <div class="flex items-center gap-4 p-4">
            <div class="flex-1"></div>
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
                        <Button type="submit" @click="buildUrls">
                            Build
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
        <!-- Url List -->
        <div>
            <div v-for="(url, index) in urlList" :key="index" class=" border-t py-4 px-4">
                <div class="bg-secondary inline-flex items-center rounded-lg divide-x mb-3">
                    <div class="font-bold pr-3">{{ url.title }}</div>
                    <Button size="icon" variant="secondary" @click="copyUrl(index)">
                        <svg v-if="copiedIndex === index" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path></svg>
                        <svg v-else xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M184,64H40a8,8,0,0,0-8,8V216a8,8,0,0,0,8,8H184a8,8,0,0,0,8-8V72A8,8,0,0,0,184,64Zm-8,144H48V80H176ZM224,40V184a8,8,0,0,1-16,0V48H72a8,8,0,0,1,0-16H216A8,8,0,0,1,224,40Z"></path></svg>
                    </Button>
                </div>
                <div class="flex-1 truncate">{{ url.url }}</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useClipboard } from "@vueuse/core"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

interface UrlItem {
    title?: string
    domain_url: string | undefined
    link_id: string | undefined
    from?: string
    to?: string
}

interface BuiltUrlItem {
    url: string
    title?: string
}

const urls = ref<string>("")
const urlList = ref<BuiltUrlItem[]>([])
const copiedIndex = ref<number | null>(null)

const { copy } = useClipboard()

const CMS_URL = ref<string>("{{domain_url}}?coupon={{COUPON_ID}}&utm_source={{UTM_SOURCE}}&utm_medium={{UTM_MEDIUM}}&utm_campaign={{UTM_CAMPAIGN}}&link_id=cms{{link_id}}")
// const BE_URL = ref<string>("{{domain_url}}?coupon={{COUPON_ID}}&utm_source={{UTM_SOURCE}}&utm_medium={{UTM_MEDIUM}}&utm_campaign={{UTM_CAMPAIGN}}&WFF_selOneWayFrom={{from}}&WFF_selOneWayTo={{to}}&link_id={{link_id}}")

const buildUrls = () => {
    const tempUrlsList = urls.value.split("\n");
    const urlsArray: UrlItem[] = []

    tempUrlsList.forEach(item => {
        const urlItem: UrlItem = { domain_url: "", link_id: "" };
        urlItem.domain_url = item.split(";")[1];
        const rawLinkId = (item.split(";")[0] || "").trim();
        urlItem.link_id = rawLinkId.replace(/[^a-zA-Z0-9_-]/g, "");
        urlItem.title = rawLinkId;
        urlsArray.push(urlItem);
    })

    urlsArray.forEach(item => {
        const urlItem: BuiltUrlItem = { url: "", title: item.title };
        let builtUrl = CMS_URL.value;
        builtUrl = builtUrl.replace("{{domain_url}}", item.domain_url || "");
        builtUrl = builtUrl.replace("{{link_id}}", item.link_id || "");
        urlItem.url = builtUrl;
        urlList.value.push(urlItem);
    })
}

const copyUrl = async (index: number) => {
    const text = urlList.value[index]?.url || ""
    try {
        await copy(text)
        copiedIndex.value = index
        // clear feedback after 1.5s
        setTimeout(() => {
            if (copiedIndex.value === index) copiedIndex.value = null
        }, 1500)
    } catch (e) {
        // ignore copy errors for now
        console.error("Copy failed", e)
    }
}
</script>
