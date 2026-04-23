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
        "id": 45,
        "title": "Activewear",
        "sort": null,
        "link_type": "link",
        "mega_menu": 1,
        "mega_menu_type": null,
        "slug": "activewear",
        "path": "collections?category= activewear",
        "badge_text": null,
        "badge_color": null,
        "content_item": null,
        "item_image_id": null,
        "banner_image_id": null,
        "parent_id": null,
        "is_target_blank": 0,
        "status": 1,
        "created_by_id": 1,
        "created_at": "2024-01-25T00:10:08.000000Z",
        "product_ids": [],
        "blog_ids": [],
        "item_image": null,
        "banner_image": null,
        "child": []
    },
    {
        "id": 162,
        "title": "Men",
        "sort": null,
        "link_type": "link",
        "mega_menu": 0,
        "mega_menu_type": "simple",
        "slug": "men",
        "path": "collections?category=men",
        "badge_text": null,
        "badge_color": null,
        "content_item": null,
        "item_image_id": null,
        "banner_image_id": null,
        "parent_id": null,
        "is_target_blank": 0,
        "status": 1,
        "created_by_id": 1,
        "created_at": "2025-01-10T01:24:58.000000Z",
        "product_ids": [],
        "blog_ids": [],
        "item_image": null,
        "banner_image": null,
        "child": []
    },
    {
        "id": 163,
        "title": "Women",
        "sort": null,
        "link_type": "link",
        "mega_menu": 0,
        "mega_menu_type": null,
        "slug": "women",
        "path": "collections?category=women",
        "badge_text": null,
        "badge_color": null,
        "content_item": null,
        "item_image_id": null,
        "banner_image_id": null,
        "parent_id": null,
        "is_target_blank": 0,
        "status": 1,
        "created_by_id": 1,
        "created_at": "2025-01-10T01:25:25.000000Z",
        "product_ids": [],
        "blog_ids": [],
        "item_image": null,
        "banner_image": null,
        "child": []
    }
]

// Export processed menu options with updated URLs
export const menuOptions: any[] = processMenuItems(rawMenuOptions);