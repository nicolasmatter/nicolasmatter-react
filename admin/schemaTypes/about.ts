export default {
  name: 'about',
  type: 'document',
  title: 'About',
  fields: [
    {
      name: 'backgroundImage',
      type: 'image',
      title: 'Background Image',
    },
    {
      name: 'projectID',
      type: 'string',
      title: 'ID',
    },
    {
      name: 'name',
      type: 'string',
      title: 'Name',
    },
    {
      name: 'year',
      type: 'string',
      title: 'Year',
    },
    {
      name: 'headline',
      type: 'text',
      title: 'Headline',
    },
    {
      name: 'portableText',
      type: 'array',
      of: [{type: 'block'}],
    },

    {
      name: 'images',
      type: 'array',
      title: 'Images',
      of: [
        {
          name: 'image',
          type: 'image',
          title: 'Image',
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
            },
          ],
        },
      ],
    },
    {
      name: 'tags',
      type: 'array',
      title: 'Tags',
      of: [
        {
          name: 'tag',
          type: 'string',
          title: 'Tag',
        },
      ],
    },
  ],
}
