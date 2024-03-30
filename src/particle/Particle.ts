/*
* Copyright (c) 2013 Google, Inc.
*
* This software is provided 'as-is', without any express or implied
* warranty.  In no event will the authors be held liable for any damages
* arising from the use of this software.
* Permission is granted to anyone to use this software for any purpose,
* including commercial applications, and to alter it and redistribute it
* freely, subject to the following restrictions:
* 1. The origin of this software must not be misrepresented; you must not
* claim that you wrote the original software. If you use this software
* in a product, an acknowledgment in the product documentation would be
* appreciated but is not required.
* 2. Altered source versions must be plainly marked as such, and must not be
* misrepresented as being the original software.
* 3. This notice may not be removed or altered from any source distribution.
*/

import { clamp } from '../common/Math'
import { Vec2 } from '../common/Vec2';
import { b2ParticleGroup } from './ParticleGroup';
import { SettingsInternal as Settings } from '../Settings';

const {
  b2_invalidParticleIndex,
} = Settings;

const B2PARTICLECOLOR_BITS_PER_COMPONENT = 8; // (sizeof(uint8) << 3);
// Maximum value of a b2ParticleColor component.
const B2PARTICLECOLOR_MAX_VALUE =
  ((1 << B2PARTICLECOLOR_BITS_PER_COMPONENT) - 1);

/**
 * The particle type. Can be combined with the | operator.
 */ 
export const enum ParticleFlag {
  /** Water particle. */
  b2_waterParticle = 0,
  /** Removed after next simulation step. */
  b2_zombieParticle = 1 << 1,
  /** Zero velocity. */
  b2_wallParticle = 1 << 2,
  /** With restitution from stretching. */
  b2_springParticle = 1 << 3,
  /** With restitution from deformation. */
  b2_elasticParticle = 1 << 4,
  /** With viscosity. */
  b2_viscousParticle = 1 << 5,
  /** Without isotropic pressure. */
  b2_powderParticle = 1 << 6,
  /** With surface tension. */
  b2_tensileParticle = 1 << 7,
  /** Mix color between contacting particles. */
  b2_colorMixingParticle = 1 << 8,
  /** Call b2DestructionListener on destruction. */
  b2_destructionListenerParticle = 1 << 9,
  /** Prevents other particles from leaking. */
  b2_barrierParticle = 1 << 10,
  /** Less compressibility. */
  b2_staticPressureParticle = 1 << 11,
  /** Makes pairs or triads with other particles. */
  b2_reactiveParticle = 1 << 12,
  /** With high repulsive force. */
  b2_repulsiveParticle = 1 << 13,
  /**
   * Call b2ContactListener when this particle is about to interact with
   * a rigid body or stops interacting with a rigid body.
   * This results in an expensive operation compared to using
   * b2_fixtureContactFilterParticle to detect collisions between
   * particles.
   */
  b2_fixtureContactListenerParticle = 1 << 14,
  /**
   * Call b2ContactListener when this particle is about to interact with
   * another particle or stops interacting with another particle.
   * This results in an expensive operation compared to using
   * b2_particleContactFilterParticle to detect collisions between
   * particles.
   */
  b2_particleContactListenerParticle = 1 << 15,
  /** Call b2ContactFilter when this particle interacts with rigid bodies. */
  b2_fixtureContactFilterParticle = 1 << 16,
  /**
   * Call b2ContactFilter when this particle interacts with other
   * particles.
   */
  b2_particleContactFilterParticle = 1 << 17,
};

// TODO
/** Small color object for each particle */
export class b2ParticleColor {

  public r: number;
  public g: number;
  public b: number;
  public a: number;

  /** Maximum value of a b2ParticleColor component. */
  protected static k_maxValue = B2PARTICLECOLOR_MAX_VALUE;
  /** 1.0 / k_maxValue. */
  protected static k_inverseMaxValue = 1.0 / B2PARTICLECOLOR_MAX_VALUE;
  /** Number of bits used to store each b2ParticleColor component. */
  protected static k_bitsPerComponent = B2PARTICLECOLOR_BITS_PER_COMPONENT;

  constructor();
  /**
   * Constructor with four elements: r (red), g (green), b (blue), and a
   * (opacity).
   * Each element can be specified 0 to 255.
   */
  constructor(r: number, g: number, b: number, a: number); // TODO b2Inline?
  // /**
  //  * Constructor that initializes the above four elements with the value of
  //  * the b2Color object.
  //  */
  // constructor(const b2Color& color);
  constructor(r = 0, g = 0, b = 0, a = 0) {
    this.set(r, g, b, a);
  }


  /**
   * True when all four color elements equal 0. When true, a particle color
   * buffer isn't allocated by CreateParticle().
   */
  isZero() {
    return !this.r && !this.g && !this.b && !this.a;
  }

  /// Used internally to convert the value of b2Color.
  ///
//    b2Color b2ParticleColor::getColor() const
//    {
//        return b2Color(k_inverseMaxValue * r,
//                    k_inverseMaxValue * g,
//                    k_inverseMaxValue * b);
//    }

  /**
   * Sets color for current object using the four elements described above.
   */
  set(r_: number, g_: number, b_: number, a_: number) {
    this.r = r_;
    this.g = g_;
    this.b = b_;
    this.a = a_;
  }

  /// Initializes the object with the value of the b2Color.
  ///
//	void Set(const b2Color& color);
//    void b2ParticleColor::Set(const b2Color& color)
//    {
//        Set((uint8)(k_maxValue * color.r),
//            (uint8)(k_maxValue * color.g),
//            (uint8)(k_maxValue * color.b),
//            B2PARTICLECOLOR_MAX_VALUE);
//    }



  /// Assign a b2ParticleColor to this instance.
/*	b2ParticleColor& operator = (const b2ParticleColor &color)
  {
    Set(color.r, color.g, color.b, color.a);
    return *this;
  }

  /// Multiplies r, g, b, a members by s where s is a value between 0.0
  /// and 1.0.
  b2ParticleColor& operator *= (float32 s)
  {
    Set((uint8)(r * s), (uint8)(g * s), (uint8)(b * s), (uint8)(a * s));
    return *this;
  }

  /// Scales r, g, b, a members by s where s is a value between 0 and 255.
  b2ParticleColor& operator *= (uint8 s)
  {
    // 1..256 to maintain the complete dynamic range.
    const int32 scale = (int32)s + 1;
    Set((uint8)(((int32)r * scale) >> k_bitsPerComponent),
      (uint8)(((int32)g * scale) >> k_bitsPerComponent),
      (uint8)(((int32)b * scale) >> k_bitsPerComponent),
      (uint8)(((int32)a * scale) >> k_bitsPerComponent));
    return *this;
  }

  /// Scales r, g, b, a members by s returning the modified b2ParticleColor.
  b2ParticleColor operator * (float32 s) const
  {
    return MultiplyByScalar(s);
  }

  /// Scales r, g, b, a members by s returning the modified b2ParticleColor.
  b2ParticleColor operator * (uint8 s) const
  {
    return MultiplyByScalar(s);
  }

  /// Add two colors.  This is a non-saturating addition so values
  /// overflows will wrap.
  b2Inline b2ParticleColor& operator += (const b2ParticleColor &color)
  {
    r += color.r;
    g += color.g;
    b += color.b;
    a += color.a;
    return *this;
  }

  /// Add two colors.  This is a non-saturating addition so values
  /// overflows will wrap.
  b2ParticleColor operator + (const b2ParticleColor &color) const
  {
    b2ParticleColor newColor(*this);
    newColor += color;
    return newColor;
  }

  /// Subtract a color from this color.  This is a subtraction without
  /// saturation so underflows will wrap.
  b2Inline b2ParticleColor& operator -= (const b2ParticleColor &color)
  {
    r -= color.r;
    g -= color.g;
    b -= color.b;
    a -= color.a;
    return *this;
  }

  /// Subtract a color from this color returning the result.  This is a
  /// subtraction without saturation so underflows will wrap.
  b2ParticleColor operator - (const b2ParticleColor &color) const
  {
    b2ParticleColor newColor(*this);
    newColor -= color;
    return newColor;
  }

  /// Compare this color with the specified color.
  bool operator == (const b2ParticleColor &color) const
  {
    return r == color.r && g == color.g && b == color.b && a == color.a;
  }
*/
  /**
   * Mix mixColor with this color using strength to control how much of
   * mixColor is mixed with this color and vice versa.  The range of
   * strength is 0..128 where 0 results in no color mixing and 128 results
   * in an equal mix of both colors.  strength 0..128 is analogous to an
   * alpha channel value between 0.0f..0.5f.
   */
  mix(mixColor: b2ParticleColor, strength: number) {
    b2ParticleColor.mixColors(this, mixColor, strength);
  }

  /** Mix colorA with colorB using strength to control how much of
   * colorA is mixed with colorB and vice versa.  The range of
   * strength is 0..128 where 0 results in no color mixing and 128 results
   * in an equal mix of both colors.  strength 0..128 is analogous to an
   * alpha channel value between 0.0f..0.5f.
   */
  static mixColors(colorA: b2ParticleColor, colorB: b2ParticleColor, strength: number) {
    const dr = ((strength * (colorB.r - colorA.r)) >>
                 b2ParticleColor.k_bitsPerComponent) | 0;
    const dg = ((strength * (colorB.g - colorA.g)) >>
                 b2ParticleColor.k_bitsPerComponent) | 0;
    const db = ((strength * (colorB.b - colorA.b)) >>
                 b2ParticleColor.k_bitsPerComponent) | 0;
    const da = ((strength * (colorB.a - colorA.a)) >>
                 b2ParticleColor.k_bitsPerComponent) | 0;
    colorA.r += dr;
    colorA.g += dg;
    colorA.b += db;
    colorA.a += da;
    colorB.r -= dr;
    colorB.g -= dg;
    colorB.b -= db;
    colorB.a -= da;
  }

/*private:
  /// Generalization of the multiply operator using a scalar in-place
  /// multiplication.
  template <typename T>
  b2ParticleColor MultiplyByScalar(T s) const
  {
    b2ParticleColor color(*this);
    color *= s;
    return color;
  }
*/

  static zero(): b2ParticleColor {
    const obj = Object.create(b2ParticleColor.prototype);
    obj.r = 0;
    obj.g = 0;
    obj.b = 0;
    obj.a = 0;
    return obj;
  }

}

/**
 * A particle definition holds all the data needed to construct a particle.
 * You can safely re-use these definitions.
 */
export interface ParticleDef {
  // #if LIQUIDFUN_EXTERNAL_LANGUAGE_API
	// /** Set position with direct floats */
	// setPosition(x: number, y: number) {
  //   this.position.set(x, y);
  // }

	// /** Set color with direct ints. */
	// setColor(int32 r, int32 g, int32 b, int32 a) {
  //   this.color.Set((uint8)r, (uint8)g, (uint8)b, (uint8)a);
  // }
  // #endif // LIQUIDFUN_EXTERNAL_LANGUAGE_API

  /**
   * Specifies the type of particle (see {@link ParticleFlag}).
   * 
   * A particle may be more than one type.
   * Multiple types are chained by logical sums, for example:
   * ```
   * pd.flags = b2_elasticParticle | b2_viscousParticle
   * ```
   */
  flags: number;
  /**
   * The world position of the particle.
   */
  position: Vec2;
  /**
   * The linear velocity of the particle in world co-ordinates.
   */
  velocity: Vec2;
  /**
   * The color of the particle.
   */
  color: b2ParticleColor;
  /**
   * Lifetime of the particle in seconds.  A value <= 0.0f indicates a
   * particle with infinite lifetime.
   */
  lifetime: number;
  /**
   * Use this to store application-specific body data.
   */
  userData: any;
  /**
   * An existing particle group to which the particle will be added.
   */
  group: b2ParticleGroup | null;
}

export const ParticleDefDefault: ParticleDef = {
  flags: 0,
  position: Vec2.zero(),
  velocity: Vec2.zero(),
  color: b2ParticleColor.zero(),
  lifetime: 0.0,
  userData: null,
  group: null,
};

/**
 * A helper function to calculate the optimal number of iterations.
 */
export function b2CalculateParticleIterations(
  gravity: number, radius: number, timeStep: number) {
  // In some situations you may want more particle iterations than this,
  // but to avoid excessive cycle cost, don't recommend more than this.
  const B2_MAX_RECOMMENDED_PARTICLE_ITERATIONS = 8;
  const B2_RADIUS_THRESHOLD = 0.01;
  const iterations =
    Math.ceil(Math.sqrt(gravity / (B2_RADIUS_THRESHOLD * radius)) * timeStep);
  return clamp(iterations, 1, B2_MAX_RECOMMENDED_PARTICLE_ITERATIONS);
}

/**
 * Handle to a particle. Particle indices are ephemeral: the same index might
 * refer to a different particle, from frame-to-frame. If you need to keep a
 * reference to a particular particle across frames, you should acquire a
 * b2ParticleHandle. Use #b2ParticleSystem::GetParticleHandleFromIndex() to
 * retrieve the b2ParticleHandle of a particle from the particle system.
 */
export class b2ParticleHandle { // extends b2TypedIntrusiveListNode<b2ParticleHandle> // TODO

  // Allow b2ParticleSystem to use SetIndex() to associate particle handles
  // with particle indices.
//	friend class b2ParticleSystem;

  /** Index of the particle within the particle system. */
  private m_index: number;

  /** Initialize the index associated with the handle to an invalid index. */
  constructor() {
    this.m_index = b2_invalidParticleIndex;
  }
  // /** Empty destructor. */
  // ~b2ParticleHandle() { }

  /** Get the index of the particle associated with this handle. */
  getIndex() {
    return this.m_index;
  }

  /** Set the index of the particle associated with this handle. */
  setIndex(index: number) {
    this.m_index = index;
  }

};
