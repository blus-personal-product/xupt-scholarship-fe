
/**
 * 获取合作项目的得分情况
 * @param order 个人在团队中排名
 * @param partners 总合作人数
 */
export const getCooperationScore = (order: number = 1, partners: number = 1): number => {
  const fixedScore = [0.12, 0.08, 0.05];
  const fixedFirstStartScore = 0.65;
  //输入数据错误
  if (order > partners || order < 1 || partners < 1) return 0;
  // 如果只有一个人，占比是1
  if (order === 1 && partners === 1) return 1;
  // 如果五个人内，第2，3，4名的得分占比始终固定
  if (order > 2 && order < 5) return fixedScore[order - 3];
  // 排序为1并且合作人数超过两个
  if (order === 1) {
    const value = fixedFirstStartScore - 0.05 * (partners - 2);
    return value >= 0.5 ? value : 0.5
  }
  // 第二名在人数增加到四人后维持在25%
  if (order === 2 && partners > 3) return 0.25;

  if (order === 2) {
    if (partners === 2) {
      return 0.35;
    } else {
      return 0.28;
    }
  }
  //合作人数超过 5 人，第 5 及以后完成人平均分配 5％工作量。
  return +(fixedScore[2] / (partners - 4)).toFixed(4);
}