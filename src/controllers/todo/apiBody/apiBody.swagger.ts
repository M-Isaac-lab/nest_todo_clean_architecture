export const createTodo = {
  schema: {
    type: 'object',
    properties: {
      title: {
        type: 'string',
        description: 'Titre du todo',
      },
      description: {
        type: 'string',
        description: 'Description du todo',
      },
      user_id: {
        type: 'string',
        description: 'ID de l\'utilisateur',
      },
      files: {
        type: 'array',
        items: {
          type: 'string',
          format: 'binary',
        },
        description: 'Fichiers à uploader',
      },
    },
    required: ['title', 'description', 'user_id'], // Ajoutez ici les champs requis de votre DTO
  },
}
