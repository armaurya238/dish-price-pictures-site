
import React, { useState } from 'react';
import { Section } from '@/types/restaurant';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Edit, Trash, Plus } from 'lucide-react';

interface SectionManagerProps {
  restaurantId: string;
  sections: Section[];
  onAddSection: (name: string, description: string) => void;
  onEditSection: (section: Section) => void;
  onDeleteSection: (sectionId: string) => void;
  onSelectSection: (sectionId: string) => void;
  selectedSectionId: string | null;
}

const SectionManager: React.FC<SectionManagerProps> = ({
  restaurantId,
  sections,
  onAddSection,
  onEditSection,
  onDeleteSection,
  onSelectSection,
  selectedSectionId,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSection, setEditingSection] = useState<Section | null>(null);
  const [sectionName, setSectionName] = useState('');
  const [sectionDescription, setSectionDescription] = useState('');

  const handleOpenAddDialog = () => {
    setEditingSection(null);
    setSectionName('');
    setSectionDescription('');
    setIsDialogOpen(true);
  };

  const handleOpenEditDialog = (section: Section) => {
    setEditingSection(section);
    setSectionName(section.name);
    setSectionDescription(section.description || '');
    setIsDialogOpen(true);
  };

  const handleSaveSection = () => {
    if (!sectionName.trim()) {
      toast.error('Section name is required');
      return;
    }

    if (editingSection) {
      onEditSection({
        ...editingSection,
        name: sectionName,
        description: sectionDescription,
      });
      toast.success(`${sectionName} section has been updated!`);
    } else {
      onAddSection(sectionName, sectionDescription);
      toast.success(`${sectionName} section has been added!`);
    }

    setIsDialogOpen(false);
  };

  const handleDeleteSection = (section: Section) => {
    if (window.confirm(`Are you sure you want to delete "${section.name}" section and all its dishes?`)) {
      onDeleteSection(section.id);
      toast.success(`${section.name} section has been removed`);
    }
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Menu Sections</h2>
        <Button onClick={handleOpenAddDialog} variant="outline" size="sm">
          <Plus className="w-4 h-4 mr-2" /> Add Section
        </Button>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {sections.length > 0 ? (
          sections.map((section) => (
            <div
              key={section.id}
              className={`flex items-center border rounded-lg px-3 py-2 ${
                selectedSectionId === section.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-background hover:bg-muted cursor-pointer'
              }`}
            >
              <div
                className="mr-2 flex-grow"
                onClick={() => onSelectSection(section.id)}
              >
                <span className="font-medium">{section.name}</span>
              </div>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                  onClick={() => handleOpenEditDialog(section)}
                >
                  <Edit className="h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                  onClick={() => handleDeleteSection(section)}
                >
                  <Trash className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-sm text-muted-foreground">
            No sections created yet. Create a section to organize your menu items.
          </div>
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>{editingSection ? 'Edit Section' : 'Add New Section'}</DialogTitle>
            <DialogDescription>
              Organize your menu by creating sections like Appetizers, Main Course, Desserts, etc.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="section-name" className="text-right col-span-1">
                Name
              </label>
              <Input
                id="section-name"
                className="col-span-3"
                value={sectionName}
                onChange={(e) => setSectionName(e.target.value)}
                placeholder="Section name (e.g., Appetizers)"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="section-description" className="text-right col-span-1">
                Description
              </label>
              <Textarea
                id="section-description"
                className="col-span-3"
                value={sectionDescription}
                onChange={(e) => setSectionDescription(e.target.value)}
                placeholder="Section description (optional)"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveSection}>
              {editingSection ? 'Save Changes' : 'Add Section'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SectionManager;
