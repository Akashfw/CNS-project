import React from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const FlowCanvas = ({ steps, addStep, onDragEnd }) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="canvas">
        {(provided) => (
          <div
            className="flow-canvas"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {steps.map((step, index) => (
              <Draggable key={step.id} draggableId={step.id} index={index}>
                {(provided) => (
                  <div
                    className="step"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    {step.name}
                  </div>
                )}
              </Draggable>
            ))}
            <button className="add-step" onClick={addStep}>
              +
            </button>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default FlowCanvas;
