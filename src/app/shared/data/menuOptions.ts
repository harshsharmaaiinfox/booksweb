// Helper function to build collection URL with only the clicked item's slug
// Format: /collections/itemSlug
function buildCollectionUrl(item: any): string {
  return `/collections/${item.slug}`;
}

// Helper function to process menu items recursively and update paths
function processMenuItems(items: any[], parentSlugs: string[] = []): any[] {
  return items.map(item => {
    const currentParentSlugs = item.slug ? [...parentSlugs, item.slug] : parentSlugs;
    
    // Process children first
    const processedChild = item.child && item.child.length > 0 
      ? processMenuItems(item.child, currentParentSlugs)
      : item.child;
    
    // Update path for link_type === 'link'
    let updatedPath = item.path;
    if (item.link_type === 'link' && item.slug) {
      updatedPath = buildCollectionUrl(item);
    }
    
    return {
      ...item,
      child: processedChild,
      path: updatedPath
    };
  });
}

// Raw menu data
const rawMenuOptions: any[] = [
    {
        "id": 224,
        "title": "Audio Book",
        "sort": null,
        "link_type": "link",
        "mega_menu": 0,
        "mega_menu_type": "simple",
        "slug": "audio-books",
        "path": "audio books",
        "badge_text": null,
        "badge_color": null,
        "content_item": null,
        "item_image_id": null,
        "banner_image_id": null,
        "parent_id": null,
        "is_target_blank": 0,
        "status": 1,
        "created_by_id": 1,
        "created_at": "2026-04-24T09:54:43.000000Z",
        "product_ids": [],
        "blog_ids": [],
        "item_image": null,
        "banner_image": null,
        "child": []
    },
    {
        "id": 225,
        "title": "Audio Template",
        "sort": null,
        "link_type": "link",
        "mega_menu": 0,
        "mega_menu_type": null,
        "slug": "audio-templates",
        "path": "audio templates",
        "badge_text": null,
        "badge_color": null,
        "content_item": null,
        "item_image_id": null,
        "banner_image_id": null,
        "parent_id": null,
        "is_target_blank": 0,
        "status": 1,
        "created_by_id": 1,
        "created_at": "2026-04-24T09:55:02.000000Z",
        "product_ids": [],
        "blog_ids": [],
        "item_image": null,
        "banner_image": null,
        "child": []
    },
    {
        "id": 226,
        "title": "E-Book",
        "sort": null,
        "link_type": "link",
        "mega_menu": 0,
        "mega_menu_type": null,
        "slug": "e-books",
        "path": "e-books",
        "badge_text": null,
        "badge_color": null,
        "content_item": null,
        "item_image_id": null,
        "banner_image_id": null,
        "parent_id": null,
        "is_target_blank": 0,
        "status": 1,
        "created_by_id": 1,
        "created_at": "2026-04-24T09:55:16.000000Z",
        "product_ids": [],
        "blog_ids": [],
        "item_image": null,
        "banner_image": null,
        "child": []
    },
    {
        "id": 227,
        "title": "Graphics Template",
        "sort": null,
        "link_type": "link",
        "mega_menu": 0,
        "mega_menu_type": null,
        "slug": "graphics-templates",
        "path": "graphics templates",
        "badge_text": null,
        "badge_color": null,
        "content_item": null,
        "item_image_id": null,
        "banner_image_id": null,
        "parent_id": null,
        "is_target_blank": 0,
        "status": 1,
        "created_by_id": 1,
        "created_at": "2026-04-24T09:55:39.000000Z",
        "product_ids": [],
        "blog_ids": [],
        "item_image": null,
        "banner_image": null,
        "child": []
    },
    {
        "id": 228,
        "title": "Video Template",
        "sort": null,
        "link_type": "link",
        "mega_menu": 0,
        "mega_menu_type": "simple",
        "slug": "video-templates",
        "path": "video templates",
        "badge_text": null,
        "badge_color": null,
        "content_item": null,
        "item_image_id": null,
        "banner_image_id": null,
        "parent_id": null,
        "is_target_blank": 0,
        "status": 1,
        "created_by_id": 1,
        "created_at": "2026-04-24T09:56:20.000000Z",
        "product_ids": [],
        "blog_ids": [],
        "item_image": null,
        "banner_image": null,
        "child": []
    }
]

// Export processed menu options with updated URLs
export const menuOptions: any[] = processMenuItems(rawMenuOptions);