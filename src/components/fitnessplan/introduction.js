import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import Man1 from "../../material/SVG/persons/man-01.png"
import Man2 from "../../material/SVG/persons/man-02.png"
import Man3 from "../../material/SVG/persons/man-03.png"

export default function FitnessPlanIntroduction({display}) {

    return (
      <>
        <div class="p-4 container-fluid payment-sec">
          <div class="text-right">
            <Link to="./fitnessplan/nutrition" class="btn btn-secondary mr-2 create-btn">
              Create Nutration Plan
            </Link>
            <a href="./workoutplan.html" class="btn btn-secondary create-btn">
              Create Workout Plan
            </a>
          </div>
          <div class="row fitness-sec">
            <div class="col-md-4">
              <div class="body-type">
                <img src={Man1} width={80} alt="man1" />
                <h2>
                  Ectomorp <br />
                  Basic Info:
                </h2>
                <p>
                  Characterized by a short upper body, long arms, and legs, long
                  narrow feet and hands and very little fat storage, narrow in
                  the chest and shoulders, with generally long, thin, muscles.
                </p>
                <p>
                  <span>Traning: </span> The extreme ectomorph’s first objective
                  is gaining weight, preferably in the form of quality muscle
                  mass. He will not have the strength and endurance for marathon
                  training sessions, will find that muscle mass develops very
                  slowly, and will often have to force himself to enough to
                  ensure continued growth.
                </p>
                <ul>
                  <li>
                    Stay with the basic exercises, and include plenty of power
                    moves for a program that builds maximum mass.
                  </li>
                  <li>
                    02. Do the entire basic training workout, but resort to
                    longer rest periods, if necessary, to allow the body to cope
                    with this level of effort.
                  </li>
                  <li>
                    Keep outside activities running, swimming, other sports to a
                    minimum so that you can save some calories for muscle
                    building.
                  </li>
                </ul>
                <p>
                  <span>Diet: </span> Pay careful attention to nutrition, take
                  in more calories than you are accustomed to, and if necessary,
                  use weight gain and protein drinks to supplement your food
                  intake. weight, preferably in the form of quality muscle mass.
                  He will not have the strength and endurance for marathon
                  training sessions, will find that muscle mass develops very
                  slowly, and will often have to force himself to enough to
                  ensure continued growth.
                </p>
                <div class="text-center mt-4">
                  <button class="btn btn-primary">Select</button>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="body-type">
                <img src={Man2} width="80" alt="Mesomorph" />
                <h2>
                  Mesomorph <br />
                  Basic Info:
                </h2>
                <p>
                  Large chest, long torso, solid muscle structure, and great
                  strength.
                </p>
                <p>
                  <span>Traning: </span> The mesomorph will find it relatively
                  easy to build muscle mass, but will have to be certain to
                  include a sufficient variety of exercises in his program so
                  that the muscles develop proportionately and well-shaped
                  rather than just thick and bulky.
                </p>
                <ul>
                  <li>
                    A combination of heavy power moves and a variety of shaping
                    exercises. The more varied the program, the better the
                    quality, proportion and symmetry of the physique.
                  </li>
                  <li>
                    Relatively long workouts with short rest time. But remember
                    that the mesomorphic physique responds so well to training
                    that super long sessions are not needed.
                  </li>
                </ul>
                <p>
                  <span>Diet: </span> A balanced diet with plenty of protein and
                  maintaining a calorie level that keeps the physique within 10
                  or 15 pounds of contest level weight all year long. No
                  “bulking up” 30 or 40 pounds and then having to drop all of
                  that useless weight for competition.
                </p>
                <div class="text-center mt-4">
                  <button class="btn btn-primary">Select</button>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="body-type">
                <img
                  src={Man3}
                  width="80"
                  alt="Endomorph"
                />
                <h2>
                  Endomorph <br />
                  Basic Info:
                </h2>
                <p>
                  Soft musculature, round face, short neck, wide hips, and heavy
                  fat storage.
                </p>
                <p>
                  <span>Traning: </span> Generally, the endomorph will not have
                  too much difficulty building muscle, but will have to be
                  concerned with losing fat weight and then being very careful
                  with diet so as not to gain that weight.
                </p>
                <ul>
                  <li>
                    Hight set, high repetition training with very short rest
                    periods, so as to burn of as fat as possible.
                  </li>
                  <li>
                    Additional aerobic exercise such as bicycle riding, running,
                    or some other calorie consuming activity.
                  </li>
                </ul>
                <p>
                  <span>Diet: </span> A low-calorie diet that contains the
                  necessary nutritional balance. Not “zero” anything, but the
                  minimum amount of protein, carbohydrates, and fats, with
                  vitamin and mineral supplements to be certain body is not
                  being deprived of ant essential nutrients.
                </p>
                <div class="text-center mt-4">
                  <button class="btn btn-primary">Select</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}

