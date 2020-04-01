const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Profile = require('../../models/Profile');
const User = require('../../models/User');
// @route  GET api/profile/me
// @desc   Get current users profile
// @access Private
router.get('/me', auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({
			user: req.user.id
		});

		if (!profile) {
			return res.status(400).json({ msg: 'There is no profile for this user' });
		}
		// only populate from user document if profile exists
		res.json(profile.populate('user', ['name', 'avatar']));
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route  POST api/profile/
// @desc   Create or update a user profile
// @access Private

router.post(
	'/',
	[
		auth,
		[
			check('status', 'Status is required').exists(),
			check('skills', 'Skills is required').exists()
		]
	],
	async (req, res) => {
		const errors = validationResult(req);
		console.log(errors);

		if (!errors.isEmpty()) {
			console.log('In here');
			return res.status(400).json({ errors: errors.array() });
		}

		const {
			company,
			location,
			website,
			bio,
			status,
			githubusername,
			skills,
			youtube,
			twitter,
			instagram,
			linkedin,
			facebook
		} = req.body;

		// Build profile object
		const profileFields = {};
		profileFields.user = req.user.id;
		if (company) profileFields.company = company;
		if (website) profileFields.website = website;
		if (location) profileFields.location = location;
		if (bio) profileFields.bio = bio;
		if (status) profileFields.status = status;
		if (githubusername) profileFields.githubusername = githubusername;

		if (skills) {
			console.log('1234');
			profileFields.skills = skills.split(',').map(skill => {
				skill.trim();
			});
		}

		console.log(profileFields.skills);
		return res.status(400).json({ errors: 'an error has occured' });
	}
);

module.exports = router;
