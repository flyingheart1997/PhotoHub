export default{
    name: 'pin',
    title: 'Pin',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
        },
        {
            name: 'about',
            title: 'About',
            type: 'string',
        },
        {
            name: 'category',
            title: 'Category',
            type: 'string',
        },
        {
            name: 'image',
            title: 'Image',
            type: 'image',
            Option: {
                hotspot: true
            }
        },
        {
            name: 'userId',
            title: 'UserId',
            type: 'string',
        },
        {
            name: 'postedBy',
            title: 'PostedBy',
            type: 'postedBy',
        },
        {
            name: 'like',
            title: 'Like',
            type: 'array',
            of: [{type: 'like'}]
        },
        {
            name: 'comment',
            title: 'Comment',
            type: 'array',
            of: [{type: 'comment'}]
        },
        
    ]
}