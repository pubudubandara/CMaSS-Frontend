import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, ArrowLeft } from 'lucide-react';
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
}

interface FormData {
  [key: string]: any;
}

export default function ContentEntryCreate() {
  const { contentTypeId, entryId } = useParams<{ contentTypeId: string; entryId?: string }>();
  const navigate = useNavigate();
  const [contentType, setContentType] = useState<ContentType | null>(null);
  const [formData, setFormData] = useState<FormData>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const isEdit = !!entryId;

  useEffect(() => {
    if (contentTypeId) {
      fetchContentType();
    }
  }, [contentTypeId]);

  useEffect(() => {
    if (isEdit && entryId) {
      fetchEntry();
    }
  }, [entryId, isEdit]);

  const fetchContentType = async () => {
    try {
      const response = await api.get(`/ContentTypes/${contentTypeId}`);
      setContentType(response.data);

      // Initialize form data with empty values
      const initialData: FormData = {};
      response.data.schema.fields.forEach((field: any) => {
        initialData[field.name] = field.type === 'boolean' ? false : '';
      });
      setFormData(initialData);
    } catch (error) {
      console.error('Failed to fetch content type:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchEntry = async () => {
    try {
      const response = await api.get(`/ContentEntries/${entryId}`);
      setFormData(response.data.data);
    } catch (error) {
      console.error('Failed to fetch entry:', error);
    }
  };

  const handleInputChange = (fieldName: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const payload = {
        data: formData,
        contentTypeId: parseInt(contentTypeId!),
      };

      if (isEdit) {
        await api.put(`/ContentEntries/${entryId}`, payload);
      } else {
        await api.post('/ContentEntries', payload);
      }

      navigate(`/content-manager/${contentTypeId}`);
    } catch (error) {
      console.error('Failed to save entry:', error);
      alert('Failed to save entry');
    } finally {
      setSaving(false);
    }
  };

  const renderField = (field: { name: string; type: string }) => {
    const value = formData[field.name] || '';

    switch (field.type) {
      case 'text':
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
            placeholder={`Enter ${field.name}`}
          />
        );

      case 'number':
        return (
          <input
            type="number"
            value={value}
            onChange={(e) => handleInputChange(field.name, parseFloat(e.target.value) || 0)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
            placeholder={`Enter ${field.name}`}
          />
        );

      case 'date':
        return (
          <input
            type="date"
            value={value ? new Date(value).toISOString().split('T')[0] : ''}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
          />
        );

      case 'boolean':
        return (
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={Boolean(value)}
              onChange={(e) => handleInputChange(field.name, e.target.checked)}
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            />
            <label className="ml-2 text-sm text-gray-700">
              {value ? 'Yes' : 'No'}
            </label>
          </div>
        );

      case 'richtext':
        return (
          <textarea
            value={value}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
            placeholder={`Enter ${field.name}`}
          />
        );

      default:
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
            placeholder={`Enter ${field.name}`}
          />
        );
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (!contentType) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Content type not found</div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate(`/content-manager/${contentTypeId}`)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-dark">
            {isEdit ? 'Edit' : 'Create'} {contentType.name} Entry
          </h1>
          <p className="text-sm text-gray-500">
            Fill in the details below
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-lg p-6 space-y-6">
        {contentType.schema.fields.map((field) => (
          <div key={field.name}>
            <label className="block text-sm font-medium text-dark mb-2 capitalize">
              {field.name.replace(/([A-Z])/g, ' $1').trim()}
              <span className={`ml-2 px-2 py-0.5 rounded text-xs ${
                field.type === 'text' ? 'bg-blue-100 text-blue-700' :
                field.type === 'number' ? 'bg-green-100 text-green-700' :
                field.type === 'date' ? 'bg-purple-100 text-purple-700' :
                field.type === 'boolean' ? 'bg-yellow-100 text-yellow-700' :
                field.type === 'richtext' ? 'bg-indigo-100 text-indigo-700' :
                'bg-gray-100 text-gray-700'
              }`}>
                {field.type}
              </span>
            </label>
            {renderField(field)}
          </div>
        ))}

        <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={() => navigate(`/content-manager/${contentTypeId}`)}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save size={20} />
            {saving ? 'Saving...' : 'Save Entry'}
          </button>
        </div>
      </form>
    </div>
  );
}