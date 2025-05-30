# API Reference

## References

### Box

Renames and re-exports [BoxShape](/api/classes/BoxShape)

***

### Chain

Renames and re-exports [ChainShape](/api/classes/ChainShape)

***

### Circle

Renames and re-exports [CircleShape](/api/classes/CircleShape)

***

### Edge

Renames and re-exports [EdgeShape](/api/classes/EdgeShape)

***

### Polygon

Renames and re-exports [PolygonShape](/api/classes/PolygonShape)

## Enumerations

- [ContactFeatureType](/api/enumerations/ContactFeatureType)
- [ManifoldType](/api/enumerations/ManifoldType)
- [PointState](/api/enumerations/PointState)
- [TOIOutputState](/api/enumerations/TOIOutputState)

## Classes

- [AABB](/api/classes/AABB)
- [Body](/api/classes/Body)
- [BoxShape](/api/classes/BoxShape)
- [BroadPhase](/api/classes/BroadPhase)
- [ChainShape](/api/classes/ChainShape)
- [CircleShape](/api/classes/CircleShape)
- [ClipVertex](/api/classes/ClipVertex)
- [Contact](/api/classes/Contact)
- [ContactEdge](/api/classes/ContactEdge)
- [ContactID](/api/classes/ContactID)
- [ContactImpulse](/api/classes/ContactImpulse)
- [DistanceInput](/api/classes/DistanceInput)
- [DistanceJoint](/api/classes/DistanceJoint)
- [DistanceOutput](/api/classes/DistanceOutput)
- [DistanceProxy](/api/classes/DistanceProxy)
- [DynamicTree](/api/classes/DynamicTree)
- [EdgeShape](/api/classes/EdgeShape)
- [Fixture](/api/classes/Fixture)
- [FixtureProxy](/api/classes/FixtureProxy)
- [FrictionJoint](/api/classes/FrictionJoint)
- [GearJoint](/api/classes/GearJoint)
- [Joint](/api/classes/Joint)
- [JointEdge](/api/classes/JointEdge)
- [Manifold](/api/classes/Manifold)
- [ManifoldPoint](/api/classes/ManifoldPoint)
- [Mat22](/api/classes/Mat22)
- [Mat33](/api/classes/Mat33)
- [MotorJoint](/api/classes/MotorJoint)
- [MouseJoint](/api/classes/MouseJoint)
- [PolygonShape](/api/classes/PolygonShape)
- [PrismaticJoint](/api/classes/PrismaticJoint)
- [PulleyJoint](/api/classes/PulleyJoint)
- [RevoluteJoint](/api/classes/RevoluteJoint)
- [RopeJoint](/api/classes/RopeJoint)
- [Rot](/api/classes/Rot)
- [Settings](/api/classes/Settings)
- [Shape](/api/classes/Shape)
- [ShapeCastInput](/api/classes/ShapeCastInput)
- [ShapeCastOutput](/api/classes/ShapeCastOutput)
- [SimplexCache](/api/classes/SimplexCache)
- [Solver](/api/classes/Solver)
- [Sweep](/api/classes/Sweep)
- [Testbed](/api/classes/Testbed)
- [TimeStep](/api/classes/TimeStep)
- [TOIInput](/api/classes/TOIInput)
- [TOIOutput](/api/classes/TOIOutput)
- [Transform](/api/classes/Transform)
- [TreeNode](/api/classes/TreeNode)
- [Vec2](/api/classes/Vec2)
- [Vec3](/api/classes/Vec3)
- [VelocityConstraintPoint](/api/classes/VelocityConstraintPoint)
- [WeldJoint](/api/classes/WeldJoint)
- [WheelJoint](/api/classes/WheelJoint)
- [World](/api/classes/World)
- [WorldManifold](/api/classes/WorldManifold)

## Interfaces

- [AABBValue](/api/interfaces/AABBValue)
- [BodyDef](/api/interfaces/BodyDef)
- [DistanceJointDef](/api/interfaces/DistanceJointDef)
- [DistanceJointOpt](/api/interfaces/DistanceJointOpt)
- [FixtureDef](/api/interfaces/FixtureDef)
- [FixtureOpt](/api/interfaces/FixtureOpt)
- [FrictionJointDef](/api/interfaces/FrictionJointDef)
- [FrictionJointOpt](/api/interfaces/FrictionJointOpt)
- [GearJointDef](/api/interfaces/GearJointDef)
- [GearJointOpt](/api/interfaces/GearJointOpt)
- [JointDef](/api/interfaces/JointDef)
- [JointOpt](/api/interfaces/JointOpt)
- [MassData](/api/interfaces/MassData)
- [MotorJointDef](/api/interfaces/MotorJointDef)
- [MotorJointOpt](/api/interfaces/MotorJointOpt)
- [MouseJointDef](/api/interfaces/MouseJointDef)
- [MouseJointOpt](/api/interfaces/MouseJointOpt)
- [PrismaticJointDef](/api/interfaces/PrismaticJointDef)
- [PrismaticJointOpt](/api/interfaces/PrismaticJointOpt)
- [PulleyJointDef](/api/interfaces/PulleyJointDef)
- [PulleyJointOpt](/api/interfaces/PulleyJointOpt)
- [RayCastInput](/api/interfaces/RayCastInput)
- [RayCastOutput](/api/interfaces/RayCastOutput)
- [RevoluteJointDef](/api/interfaces/RevoluteJointDef)
- [RevoluteJointOpt](/api/interfaces/RevoluteJointOpt)
- [RopeJointDef](/api/interfaces/RopeJointDef)
- [RopeJointOpt](/api/interfaces/RopeJointOpt)
- [RotValue](/api/interfaces/RotValue)
- [Style](/api/interfaces/Style)
- [TestbedInterface](/api/interfaces/TestbedInterface)
- [Vec2Value](/api/interfaces/Vec2Value)
- [Vec3Value](/api/interfaces/Vec3Value)
- [WeldJointDef](/api/interfaces/WeldJointDef)
- [WeldJointOpt](/api/interfaces/WeldJointOpt)
- [WheelJointDef](/api/interfaces/WheelJointDef)
- [WheelJointOpt](/api/interfaces/WheelJointOpt)
- [WorldDef](/api/interfaces/WorldDef)

## Type Aliases

- [ActiveKeys](/api/type-aliases/ActiveKeys)
- [BodyType](/api/type-aliases/BodyType)
- [DynamicTreeQueryCallback](/api/type-aliases/DynamicTreeQueryCallback)
- [EvaluateFunction](/api/type-aliases/EvaluateFunction)
- [RayCastCallback](/api/type-aliases/RayCastCallback)
- [ShapeType](/api/type-aliases/ShapeType)
- [TransformValue](/api/type-aliases/TransformValue)
- [WorldAABBQueryCallback](/api/type-aliases/WorldAABBQueryCallback)
- [WorldRayCastCallback](/api/type-aliases/WorldRayCastCallback)

## Functions

- [clipSegmentToLine](/api/functions/clipSegmentToLine)
- [CollideCircles](/api/functions/CollideCircles)
- [CollideEdgeCircle](/api/functions/CollideEdgeCircle)
- [CollideEdgePolygon](/api/functions/CollideEdgePolygon)
- [CollidePolygonCircle](/api/functions/CollidePolygonCircle)
- [CollidePolygons](/api/functions/CollidePolygons)
- [Distance](/api/functions/Distance)
- [getPointStates](/api/functions/getPointStates)
- [mixFriction](/api/functions/mixFriction)
- [mixRestitution](/api/functions/mixRestitution)
- [ShapeCast](/api/functions/ShapeCast)
- [testOverlap](/api/functions/testOverlap)
- [TimeOfImpact](/api/functions/TimeOfImpact)
