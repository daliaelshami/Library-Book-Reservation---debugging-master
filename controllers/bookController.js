const Book = require("../models/Book");

// Bug: Used 'const' for a changing variable, used 'forEach' which ignores 'await', and lacked try/catch.
// Fix: Changed to 'let', replaced 'forEach' with a 'for...of' loop, and wrapped in try/catch.
exports.reserveBooks = async (req, res) => {
  const { bookIds } = req.body;

  try {
    let reservedCount = 0; 
        for (const id of bookIds) {
      await Book.findByIdAndUpdate(id, { isAvailable: false });
      reservedCount++;
    }

    res.status(200).json({ msg: "Books reserved successfully", count: reservedCount });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error", error: error.message });
  }
};

// Bug: Used the deprecated method 'findByIdAndRemove', and lacked try/catch.
// Fix: Updated to the modern 'findByIdAndDelete' and added try/catch for safety.
exports.deleteBook = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedBook = await Book.findByIdAndDelete(id); // الدالة الحديثة للحذف

    if (!deletedBook) return res.status(404).json({ msg: "Book not found" });
    res.status(200).json({ msg: "Book deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error", error: error.message });
  }
};
