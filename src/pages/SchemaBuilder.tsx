import { useState } from 'react';
import { Plus, Trash2, Save } from 'lucide-react';

type FieldType = 'text' | 'number' | 'boolean' | 'date';

interface FieldDefinition {
  name: string;
  type: FieldType;
  required: boolean;
}

export default function SchemaBuilder() {
  const [typeName, setTypeName] = useState('');
  const [fields, setFields] = useState<FieldDefinition[]>([]);

  const addField = () => {
    setFields([...fields, { name: '', type: 'text', required: false }]);
  };

  const updateField = (index: number, key: keyof FieldDefinition, value: any) => {
    const newFields = [...fields];
    // @ts-ignore - dynamic key assignment
    newFields[index][key] = value;
    setFields(newFields);
  };

  const removeField = (index: number) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const saveSchema = async () => {
    const schemaPayload = {
      name: typeName,
      fields: fields
    };
    console.log("Sending to Backend:", schemaPayload);
    alert("Schema Config Logged to Console");
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
           <h1 className="text-2xl font-bold text-dark">Schema Builder</h1>
           <p className="text-sm text-dark-muted">Define the structure of your content types.</p>
        </div>
        <button onClick={saveSchema} className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded text-sm flex items-center gap-2 shadow-sm">
          <Save size={16} /> Save Schema
        </button>
      </div>

      {/* Type Name Section */}
      <div className="bg-surface border border-border rounded-lg p-6 shadow-sm mb-6">
        <label className="block text-sm font-bold text-dark mb-1">Content Type Name</label>
        <p className="text-xs text-dark-muted mb-2">This will be the name of your API endpoint (e.g. /api/content/<strong>blog-post</strong>)</p>
        <input 
          type="text" 
          className="w-full max-w-md border-border rounded focus:ring-primary focus:border-primary text-sm p-2 border"
          placeholder="e.g. Blog Post"
          value={typeName}
          onChange={(e) => setTypeName(e.target.value)}
        />
      </div>

      {/* Fields Section */}
      <div className="bg-surface border border-border rounded-lg shadow-sm">
        <div className="p-4 border-b border-border flex justify-between items-center bg-gray-50 rounded-t-lg">
          <h3 className="font-bold text-dark text-sm">Fields Definition</h3>
          <button onClick={addField} className="text-primary hover:text-primary-hover text-sm font-bold flex items-center gap-1">
            <Plus size={16} /> ADD FIELD
          </button>
        </div>
        
        <div className="p-4 space-y-3">
          {fields.length === 0 ? (
            <div className="text-center py-12 text-dark-muted text-sm border-2 border-dashed border-border rounded">
              <p>No fields added yet.</p>
              <button onClick={addField} className="text-primary font-semibold mt-2 hover:underline">Click to add your first field</button>
            </div>
          ) : (
            fields.map((field, index) => (
              <div key={index} className="flex flex-col sm:flex-row items-end gap-3 p-3 border border-border rounded bg-white hover:bg-gray-50 transition-colors">
                <div className="flex-1 w-full">
                  <label className="text-xs font-bold text-dark-muted uppercase mb-1 block">Field Name</label>
                  <input 
                    type="text" 
                    value={field.name}
                    onChange={(e) => updateField(index, 'name', e.target.value)}
                    className="w-full border-border rounded text-sm py-1.5 px-2 border focus:ring-primary focus:border-primary" 
                    placeholder="e.g. title"
                  />
                </div>
                <div className="w-full sm:w-40">
                  <label className="text-xs font-bold text-dark-muted uppercase mb-1 block">Data Type</label>
                  <select 
                    value={field.type}
                    onChange={(e) => updateField(index, 'type', e.target.value)}
                    className="w-full border-border rounded text-sm py-1.5 px-2 border focus:ring-primary focus:border-primary bg-white"
                  >
                    <option value="text">Text</option>
                    <option value="number">Number</option>
                    <option value="boolean">Boolean</option>
                    <option value="date">Date</option>
                  </select>
                </div>
                <div className="flex items-center pb-2 px-2 h-full">
                  <label className="flex items-center gap-2 text-sm text-dark cursor-pointer select-none">
                    <input 
                      type="checkbox" 
                      checked={field.required}
                      onChange={(e) => updateField(index, 'required', e.target.checked)}
                      className="rounded text-primary focus:ring-primary"
                    />
                    <span className="text-xs font-medium">Required</span>
                  </label>
                </div>
                <button 
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors" 
                  onClick={() => removeField(index)}
                  title="Remove Field"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}