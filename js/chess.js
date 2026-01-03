// Drag and drop functionality for chess pieces
document.addEventListener('DOMContentLoaded', function() {
  let draggedElement = null;
  let sourceField = null;

  // Get all fields
  const fields = document.querySelectorAll('.field');

  // Add drag event listeners to all fields with figures
  fields.forEach(field => {
    // Make fields with figures draggable
    updateFieldDraggable(field);

    // Add dragover event to allow dropping
    field.addEventListener('dragover', handleDragOver);
    field.addEventListener('drop', handleDrop);
    field.addEventListener('dragenter', handleDragEnter);
    field.addEventListener('dragleave', handleDragLeave);
  });

  function updateFieldDraggable(field) {
    const hasFigure = Array.from(field.classList).some(cls => cls.startsWith('figure-'));
    if (hasFigure) {
      field.setAttribute('draggable', 'true');
      field.addEventListener('dragstart', handleDragStart);
      field.addEventListener('dragend', handleDragEnd);
    } else {
      field.removeAttribute('draggable');
    }
  }

  function handleDragStart(e) {
    draggedElement = this;
    sourceField = this;
    this.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
  }

  function handleDragEnd(e) {
    this.classList.remove('dragging');
    // Remove all drop-target highlights
    fields.forEach(field => {
      field.classList.remove('drop-target');
    });
  }

  function handleDragOver(e) {
    if (e.preventDefault) {
      e.preventDefault();
    }
    e.dataTransfer.dropEffect = 'move';
    return false;
  }

  function handleDragEnter(e) {
    if (this !== sourceField) {
      this.classList.add('drop-target');
    }
  }

  function handleDragLeave(e) {
    this.classList.remove('drop-target');
  }

  function handleDrop(e) {
    if (e.stopPropagation) {
      e.stopPropagation();
    }

    this.classList.remove('drop-target');

    if (draggedElement !== this) {
      // Get figure classes from source
      const figureClasses = Array.from(draggedElement.classList).filter(cls => cls.startsWith('figure-'));

      // Remove figure classes from source
      figureClasses.forEach(cls => {
        draggedElement.classList.remove(cls);
      });

      // Remove any existing figure classes from target
      const targetFigureClasses = Array.from(this.classList).filter(cls => cls.startsWith('figure-'));
      targetFigureClasses.forEach(cls => {
        this.classList.remove(cls);
      });

      // Add figure classes to target
      figureClasses.forEach(cls => {
        this.classList.add(cls);
      });

      // Update draggable attributes
      updateFieldDraggable(draggedElement);
      updateFieldDraggable(this);
    }

    return false;
  }
});
