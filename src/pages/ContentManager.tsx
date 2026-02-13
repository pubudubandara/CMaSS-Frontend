import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, FileText, Box, Users, Database } from 'lucide-react';
import api from '../lib/axios';

interface ContentType {
  id: number;
  name: string;
  schema: {
    fields: Array<{
      name: string;
      type: string;
    }>;
  };
  tenantId: number;
  tenant: any;
}

export default function ContentManager() {
  const [contentTypes, setContentTypes] = useState<ContentType[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchContentTypes();
  }, []);

  const fetchContentTypes = async () => {
    try {
      const response = await api.get('/ContentTypes');
      setContentTypes(response.data);
    } catch (error) {
      console.error('Failed to fetch content types:', error);
    } finally {
      setLoading(false);
    }
  };

  const getIcon = (name: string) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('product')) return Box;
    if (lowerName.includes('user') || lowerName.includes('author')) return Users;
    if (lowerName.includes('blog')) return FileText;
    return Database;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading content types...</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-dark">Content Manager</h1>
          <p className="text-gray-600 mt-2">Manage your content types and entries</p>
        </div>
        <button
          onClick={() => navigate('/content-types/create')}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors shadow-sm"
        >
          <Plus size={20} />
          Create Content Type
        </button>
      </div>

      {contentTypes.length === 0 ? (
        <div className="text-center py-16">
          <Database size={64} className="mx-auto mb-6 text-gray-300" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No content types yet</h3>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            Create your first content type to start managing your data. Content types define the structure of your content.
          </p>
          <button
            onClick={() => navigate('/content-types/create')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
          >
            <Plus size={20} />
            Create Your First Content Type
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {contentTypes.map((contentType) => {
            const IconComponent = getIcon(contentType.name);
            return (
              <div
                key={contentType.id}
                onClick={() => navigate(`/content-manager/${contentType.id}`)}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-primary/20 transition-all duration-200 cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <IconComponent size={24} className="text-primary" />
                  </div>
                  <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    {contentType.schema.fields.length} fields
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-dark mb-2 group-hover:text-primary transition-colors">
                    {contentType.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Manage {contentType.name.toLowerCase()} entries
                  </p>

                  <div className="flex flex-wrap gap-1">
                    {contentType.schema.fields.slice(0, 3).map((field, index) => (
                      <span
                        key={index}
                        className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-md"
                      >
                        {field.name}
                      </span>
                    ))}
                    {contentType.schema.fields.length > 3 && (
                      <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-md">
                        +{contentType.schema.fields.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Click to manage</span>
                    <span className="text-primary font-medium group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

