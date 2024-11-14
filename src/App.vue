<template>
    <AppLayout>
        <!-- Header -->
        <template v-slot:header>
            <AppLogo name="Url Builder" version="1.0.0">
                <template v-slot:icon>
                    <Link2 />
                </template>
            </AppLogo>
        </template>

        <!-- Main -->
        <template v-slot:main>
            <UrlList v-if="urlsList.length > 0" :list="urlsList" />
            <EmptyState v-else :debug-mode="false" @on-add-urls="showFormDialog = true" />
        </template>
    </AppLayout>

    <!-- Form Dialog -->
    <Dialog v-model:open="showFormDialog">
        <DialogContent class="max-w-4xl">
            <DialogHeader>
                <DialogTitle>Add Urls</DialogTitle>
            </DialogHeader>
            <div>
                <Textarea v-model="urlModel" rows="30"></Textarea>
            </div>
            <DialogFooter>
                <Button class="w-[200px]" @click="formatUrls">Format Urls</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>

<script setup lang="ts">
    import AppLayout from '@/components/app/AppLayout.vue'
    import AppLogo from '@/components/app/AppLogo.vue'
    import EmptyState from '@/components/empty/EmptyState.vue'
    import UrlList from '@/components/url/UrlList.vue'

    import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
    import { Textarea } from '@/components/ui/textarea'
    import { Button } from '@/components/ui/button'
    import { Link2 } from 'lucide-vue-next'

    import { ref } from 'vue'
    import type { Url } from "@/types/url";

    const showFormDialog = ref<boolean>(false)
    const urlModel = ref<string>('')
    const urlsList = ref<Url[]>([])

    const formatUrls = () => {

        const urls = urlModel.value.split(';')
        urlsList.value = []

        urls.map(url => {

            const urlItem: Url = { identifier: '', url: '', lang: '', copied: false }
            const [lang, identifier, baseUrl] = url.split(': ').map(part => part.trim())

            if (!identifier || !baseUrl) {
                return
            }

            if (baseUrl === 'No URL') {
                const ports = identifier.split('-');
                urlItem.lang = lang
                urlItem.identifier = identifier
                if (lang === 'de') {
                    urlItem.url = `https://www.goferry.de/reservations/default.aspx?coupon={{COUPON_ID}}&utm_source={{UTM_SOURCE}}&utm_medium={{UTM_MEDIUM}}&utm_campaign={{UTM_CAMPAIGN}}&WFF_selOneWayFrom=${ports[0]}&WFF_selOneWayTo=${ports[1]}&link_id=eng${identifier}`
                }
                else if (lang === 'fr') {
                    urlItem.url = `https://www.go-ferry.fr/reservations/default.aspx?coupon={{COUPON_ID}}&utm_source={{UTM_SOURCE}}&utm_medium={{UTM_MEDIUM}}&utm_campaign={{UTM_CAMPAIGN}}&WFF_selOneWayFrom=${ports[0]}&WFF_selOneWayTo=${ports[1]}&link_id=eng${identifier}`
                }
                else {
                    urlItem.url = `https://www.go-ferry.com/reservations/default.aspx?coupon={{COUPON_ID}}&utm_source={{UTM_SOURCE}}&utm_medium={{UTM_MEDIUM}}&utm_campaign={{UTM_CAMPAIGN}}&WFF_selOneWayFrom=${ports[0]}&WFF_selOneWayTo=${ports[1]}&link_id=eng${identifier}`
                }
            }
            else {
                urlItem.lang = lang
                urlItem.identifier = identifier
                if (lang === 'de') {
                    urlItem.url = `${baseUrl}?coupon={{COUPON_ID}}&utm_source={{UTM_SOURCE}}&utm_medium={{UTM_MEDIUM}}&utm_campaign={{UTM_CAMPAIGN}}&link_id=cms${identifier}`
                }
                else if (lang === 'fr') {
                    urlItem.url = `${baseUrl}?coupon={{COUPON_ID}}&utm_source={{UTM_SOURCE}}&utm_medium={{UTM_MEDIUM}}&utm_campaign={{UTM_CAMPAIGN}}&link_id=cms${identifier}`
                }
                else {
                    urlItem.url = `${baseUrl}?coupon={{COUPON_ID}}&utm_source={{UTM_SOURCE}}&utm_medium={{UTM_MEDIUM}}&utm_campaign={{UTM_CAMPAIGN}}&link_id=cms${identifier}`
                }
            }

            urlsList.value.push(urlItem)
        })

        showFormDialog.value = false
    }

    // const copyUrl = (item: Url) => {
    //     item.copied = true
    //     copy(item.url)
    // }
</script>
