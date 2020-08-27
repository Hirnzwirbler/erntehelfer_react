/**
 * Controller for the diffrent boards for the appropriate role
 * @param {Any} req 
 * @param {Any} res 
 */
exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };
  
  exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
  };
  
  exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
  };

  exports.FarmerBoard = (req, res) => {
    res.status(200).send("Farmer Content.");
  };

  exports.helperBoard = (req, res) => {
    res.status(200).send("Helper Content.");
  };
