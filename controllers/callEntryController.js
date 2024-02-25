import { callEntry } from "../models/callEntry.js";

export const getCallEntries = async (req, res, next) => {
  try {
    let { campaignId, startDate, endDate } = req.query;
    const formattedStartDate = new Date(startDate);
    const formattedEndDate = new Date(endDate);
    if (endDate)
      formattedEndDate.setDate(formattedEndDate.getDate() + 1);

    let filter = {
      campaignId: { $regex: campaignId, $options: "i" },
      $and: [],
    };

    if (startDate) {
      filter.$and.push({ createdAt: { $gte: formattedStartDate } });
    }
    if (endDate) {
      filter.$and.push({ createdAt: { $lt: formattedEndDate } });
    }

    if (filter.$and.length === 0) {
      delete filter.$and;
    }

    const callEntries = await callEntry.aggregate([
      {
        $match: filter,
      },
    ]);

    return res.status(200).json({
      success: true,
      message: "Call Entries Fetched Successfully!",
      callEntries,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const postCallEntries = async (req, res, next) => {
  try {
    const { campaignId, status, duration, category } = req.body;
    await callEntry.create({
      campaignId,
      status,
      duration,
      category,
    });
    res.status(201).json({
      success: true,
      message: "Call Entry Created Successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

callEntry.watch().on("change", async () => {
  let stats = await Stats.find().sort({ createdAt: "desc" }).limit(1);
  const today = Date.now();

  const callEntries = await callEntry.find({
    createdAt: { $lt: today },
  });
  // Aggregate stats
  const campaignIds = Array.from(
    { length: 20 },
    (_, index) => `campaign_${index + 1}`
  );
  const statuses = ["completed", "in-progress", "scheduled"];
  const categories = ["category1", "category2", "category3"];

  let category = [];
  let campaign = [];
  let status = [];
  for (let i = 0; i < campaignIds.length; i++) {
    const campaignId = campaignIds[i];
    const campaignCalls = callEntries.filter(
      (callEntry) => callEntry.campaignId === campaignId
    );
    let someMinutes = 0;
    for (let j = 0; j < campaignCalls.length; j++) {
      someMinutes += campaignCalls[j].duration;
    }
    campaign.push({
      name: campaignId,
      calls: campaignCalls.length,
      minutes: someMinutes,
    });
  }
  for (let i = 0; i < statuses.length; i++) {
    const statusName = statuses[i];
    const statusCalls = callEntries.filter(
      (callEntry) => callEntry.status === statusName
    );
    let someMinutes = 0;
    for (let j = 0; j < statusCalls.length; j++) {
      someMinutes += statusCalls[j].duration;
    }
    status.push({
      name: statusName,
      calls: statusCalls.length,
      minutes: someMinutes,
    });
  }

  for (let i = 0; i < categories.length; i++) {
    const categoryName = categories[i];
    const categoryCalls = callEntries.filter(
      (callEntry) => callEntry.category === categoryName
    );
    let someMinutes = 0;
    for (let j = 0; j < categoryCalls.length; j++) {
      someMinutes += categoryCalls[j].duration;
    }
    category.push({
      name: categoryName,
      calls: categoryCalls.length,
      minutes: someMinutes,
    });
  }
  stats[0].calls = callEntries.length;
  stats[0].minutes = callEntries
    .map((call) => call.duration)
    .reduce((a, b) => a + b, 0);
  stats[0].category = category;
  stats[0].campaignId = campaign;
  stats[0].status = status;
  await stats[0].save();
}); // this is a change stream that listens to changes in the callEntry collection in the database
