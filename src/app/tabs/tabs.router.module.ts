import { NgModule } from '@angular/core';

import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
    {
        path: '',
        component: TabsPage,
        children: [

            {
                path: 'feed',
                loadChildren: () => import('../feed/feed.module').then(m => m.FeedPageModule)
            },
            {
                path: 'uploader',
                loadChildren: () => import('../uploader/uploader.module').then(m => m.UploaderPageModule)
            },
            {
                path: 'profile',
                loadChildren: () => import('../profile/profile.module').then(m => m.ProfilePageModule)
            },

        ]
    }
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class TabsRoutingModule { }