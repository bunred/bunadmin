import React from "react"
import { TFunction } from "i18next"
import { EditComponentProps } from "material-table"
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DraggingStyle,
  NotDraggingStyle,
  ResponderProvided
} from "react-beautiful-dnd"
import {
  BunadminFile,
  BunadminFileType,
  FileDrawer,
  useFilesStyles,
  UploaderOnDrop
} from "./"

export default function Uploader({
  t,
  files = [],
  viewMode = true,
  prefix,
  buttonTitlePreview,
  buttonTitleUpdate,
  onDrop,
  onDragSort
}: {
  t: TFunction
  files: BunadminFileType[]
  viewMode?: boolean
  prefix?: string
  buttonTitlePreview?: string
  buttonTitleUpdate?: string
  editProps?: EditComponentProps<any>
  onDrop?: UploaderOnDrop
  onDragSort(result: DropResult, provided: ResponderProvided): void
}) {
  const classes = useFilesStyles()

  const FilesList = () => {
    return (
      <DragDropContext onDragEnd={onDragSort}>
        <Droppable droppableId="droppable" direction="horizontal">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              className={classes.draggableList}
              // @ts-ignore
              style={getListStyle(snapshot.isDraggingOver)}
              {...provided.droppableProps}
            >
              {files.map((item: any, i) => (
                <Draggable key={item.id} draggableId={item.id} index={i}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={classes.draggableItem}
                      // @ts-ignore
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      <BunadminFile
                        key={i}
                        className={classes.filesItem}
                        ariaAttributes={{
                          "aria-posinset": item.pos
                        }}
                        htmlAttributes={{
                          itemID: item.id
                        }}
                        width={135}
                        viewMode={viewMode}
                        prefix={prefix}
                        // onDel={handleOnDel}
                        file={item}
                      />
                    </div>
                  )}
                </Draggable>
              ))}

              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    )
  }

  const UploadArea = () => (
    <BunadminFile
      className="upload-files"
      width={135}
      prefix={prefix}
      onDrop={onDrop}
      // onDel={handleOnDel}
    />
  )

  return (
    <FileDrawer
      t={t}
      viewMode={viewMode}
      files={files}
      FilesList={FilesList}
      UploadArea={UploadArea}
      buttonTitlePreview={buttonTitlePreview}
      buttonTitleUpdate={buttonTitleUpdate || "Upload Files"}
    />
  )
}

const getListStyle = (isDraggingOver: boolean) => ({
  borderWidth: isDraggingOver ? 2 : 0,
  padding: isDraggingOver ? "0 150px" : "0 5px",
  marginRight: isDraggingOver ? 20 : 0
})

const getItemStyle = (
  isDragging: boolean,
  draggableStyle: DraggingStyle | NotDraggingStyle | undefined
) => ({
  // styles we need to apply on draggables
  ...draggableStyle,
  opacity: isDragging ? 0.8 : 1
})
