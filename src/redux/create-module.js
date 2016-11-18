import invariant from 'invariant'
import createReducer from './create-reducer'
import { mapKeys } from '../lib'

function createModule(namespace, createDefinition) {
  // ======================================================
  // Validate Arguments
  // ======================================================
  // Ensure that a valid namespace and definition creator were provided.
  invariant(
    typeof namespace === 'string',
    '`createModule` requires a string argument `namespace` to identify your ' +
    'module. Instead, what was received was of type: %s.',
    typeof namespace
  )
  invariant(
    typeof createDefinition === 'function',
    '`createModule` requires an argument `createDefinition` which must be a ' +
    `function. Instead, while, generating the module for the "${namespace}" ` +
    'namespace, what was received was of type: %s.',
    typeof createDefinition
  )

  // ======================================================
  // Base Module
  // ======================================================
  // Generate the base definition for this module. We provide it an object
  // which references what will become its final, generated module so that
  // it can close over it and access it as needed.
  const generatedModule = {}
  const definition = createDefinition(generatedModule)

  // ----------------------------------
  // Validate Definition
  // ----------------------------------
  // Ensure that the generated definition conforms to the required interface.
  invariant(
    typeof definition === 'object',
    `Error in \`createModule\` for the "${namespace}" namespace. The value ` +
    'returned from \`createDefinition\` must be an object. Instead, what was ' +
    'received was of type: %s.',
    typeof definition
  )
  invariant(
    definition.initialState != null, // eslint-disable-line
    `Error in \`createModule\` for the "${namespace}" namespace. The object ` +
    'returned from \`createDefinition\` must define an \`initialState\` ' +
    'property that is a not a null or undefined value. Instead, what was ' +
    'received was of type: %s.',
    typeof definition.initialState
  )
  invariant(
    typeof definition.events === 'object',
    `Error in \`createModule\` for the "${namespace}" namespace. The object ` +
    'returned from \`createDefinition\` must define an \`events\` property ' +
    'that is an object. Instead, what was received was of type: %s.',
    typeof definition.events
  )
  invariant(
    typeof definition.handlers === 'object',
    `Error in \`createModule\` for the "${namespace}" namespace. The object ` +
    'returned from \`createDefinition\` must define a \`handlers\` property ' +
    'that is an object. Instead, what was received was of type: %s.',
    typeof definition.handlers
  )
  if (definition.externalHandlers) {
    invariant(
      typeof definition.externalHandlers === 'object',
      `Error in \`createModule\` for the "${namespace}" namespace. The object ` +
      'returned from \`createDefinition\` defined an \`externalHandlers\` ' +
      'property but it was not an object. Instead, what was received was of ' +
      'type %s.',
      typeof definition.externalHandlers
    )
    const externalHandlerErrors = Object.keys(definition.externalHandlers)
      .reduce((errors, key) => {
        if (!key || key === 'undefined') {
          return errors.concat([
            'An undefined or empty key was provided as a handled event type. ' +
            'This is a common source of silent errors and is often caused by ' +
            'a typo in a property accessor typo or by an invalid import.',
          ])
        }
        return errors
      }, [])
    invariant(
      !externalHandlerErrors.length,
      `Error in \`createModule\` for the "${namespace}" namespace. All ` +
      'externalHandlers defined must be valid. The following issues were ' +
      'found:\n%s',
      externalHandlerErrors.map(err => `> ${err}`).join('\n')
    )
  }

  // ----------------------------------
  // Validate Events and Handlers
  // ----------------------------------
  // Ensure that all events local to this module are valid and have handlers.
  const eventTypes = Object.keys(definition.events)
  const eventErrors = eventTypes.reduce((errors, eventType) => {
    const creator = definition.events[eventType]
    const handler = definition.handlers[eventType]
    if (typeof creator !== 'function') {
      return errors.concat([
        `Event ${eventType} did not define a valid event creator; its value ` +
        `must be a function, but instead was: ${typeof creator}.`,
      ])
    }
    if (!handler) {
      return errors.concat([
        `Event ${eventType} does not have an event handler; ensure that ` +
        `your definition object provides a function on \`handlers.${eventType}\`.`,
      ])
    }
    if (typeof handler !== 'function') {
      return errors.concat([
        `Event ${eventType} is defined as a property on your definition ` +
        'object, but it is not a function. Please check its type.',
      ])
    }
    return errors
  }, [])

  invariant(
    !eventErrors.length,
    `Error in \`createModule\` for the "${namespace}" namespace. All events ` +
    'defined must be valid and have an associated event handler. The ' +
    `following issues were found:\n%s`,
    eventErrors.map(err => `> ${err}`).join('\n')
  )

  // ======================================================
  // Finish Module
  // ======================================================

  // ----------------------------------
  // Constants
  // ----------------------------------
  // Interface conformance checks complete, begin generating the module
  const generateConstant = (eventType) => `@@${namespace}/${eventType}`
  generatedModule.constants = eventTypes.reduce((acc, eventType) => {
    acc[eventType] = generateConstant(eventType)
    return acc
  }, {})

  // ----------------------------------
  // Reducer
  // ----------------------------------
  const generatedHandlers = {
    ...mapKeys(generateConstant, definition.handlers),
    ...definition.externalHandlers,
  }
  // Generate reducer based on provided event handlers.
  generatedModule.reducer = createReducer(
    mapKeys(generateConstant, generatedHandlers),
    definition.initialState
  )

  // ----------------------------------
  // Events
  // ----------------------------------
  // Generate event creators that automatically apply a namespaced `type`
  // property to the action object.
  generatedModule.events = eventTypes.reduce((acc, eventType) => {
    const namespacedEventType = generatedModule.constants[eventType]
    const liftedEventCreator = definition.events[eventType]

    function generatedEventCreator(...args) {
      const liftedResult = liftedEventCreator(...args)
      return { ...liftedResult, type: namespacedEventType }
    }

    acc[eventType] = generatedEventCreator
    return acc
  }, {})

  // ----------------------------------
  // Others
  // ----------------------------------
  // Expose keys where no transformations are needed.
  generatedModule.initialState = { ...definition.initialState }
  generatedModule.handlers = generatedHandlers
  generatedModule.selectors = { ...definition.selectors }
  generatedModule.actions = { ...definition.actions }

  return generatedModule
}

export default createModule
