const project = {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } },
    { name: 'description', title: 'Description', type: 'text', rows: 3 },
    {
      name: 'tech',
      title: 'Tech Stack',
      type: 'array',
      of: [{ type: 'string' }],
    },
    { name: 'githubUrl', title: 'GitHub URL', type: 'url' },
    { name: 'liveUrl', title: 'Live URL', type: 'url' },
    { name: 'coverImage', title: 'Cover Image', type: 'image', options: { hotspot: true } },
    { name: 'order', title: 'Display Order', type: 'number' },
  ],
};

export default project;
